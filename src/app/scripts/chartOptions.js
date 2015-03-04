// JSHint options:
/* global Highcharts, getCurrentCountyError, rounding */
/* exported chartOptions, mapOptions, mapSeries */

'use strict';

var chartOptions = {
  chart: {
    type: 'column',
    backgroundColor: null
  },
  title: {
    text: 'Highcharts basic demo'
  },
  subtitle: {
    text: 'Source: SHOW Data'
  },
  plotOptions: {
    series: {
      events: {
        legendItemClick: function() {
          if (!this.visible) {
            //console.log(this);
            var error = $('input[name="errorbar"]').bootstrapSwitch('state');
            this.show();
            if (!error && this.linkedSeries) {
              this.linkedSeries[0].hide();
            }
            // override default toggle behavior
            return false;
          }
        }
      }
    },
    map: {
      borderColor: '#f0f0f0'
    },
    mapline: {
      lineWidth: 3
    }
  },
  tooltip: {
    crosshairs: true,
    shared: true
  },
  series : [{

    dataLabels: {
      enabled: true,
      formatter: function() {
        if (this.point.x % 3 !== 0) {
          return '';
        }
        return this.point.name;
      },
      verticalAlign: 'top'
    },
    //name: 'Random data'
  }],
  legend: {
    itemStyle: {
      fontSize:'14px'
    }
  }
};

var mapOptions = {
  colorAxis: {
    stops:
    [
    [0, '#666666'],
    // [0.001, '#fbfbfb'],
    // [1.0, '#005645'],
    [0.001,'#f7fcf5'],
    [0.125,'#e5f5e0'],
    [0.25,'#c7e9c0'],
    [0.375,'#a1d99b'],
    [0.5,'#74c476'],
    [0.625,'#41ab5d'],
    [0.75,'#238b45'],
    [0.875,'#006d2c'],
    [1.0,'#00441b'],
    ],
    min: 0
  },
  tooltip: {
    formatter: function () {
      var val = this.point.value.toFixed(2);
      var err = '';
      if (this.point.value === -1) {
        val = 'No Data';
      } else {
        var error = getCurrentCountyError(this.point.name);
        err = 'Error Range: (' + error[0].toFixed(rounding) + ' - ' + error[1].toFixed(rounding) + ')';
      }

      return '<b>' + this.series.name + '</b><br>' +
      'Point name: ' + this.point.name + '<br>' +
      'Region: ' + this.point.region + '<br>' +
      'Value: ' + val + '<br>' + err;
    }
  }
};

var mapSeries = {

  mapData: Highcharts.maps['countries/us/us-wi-all'],
  joinBy: 'hc-key',
  //name: 'Random data',
  states: {
    /*
    hover: {
      color: '#CB6'
    },
    */
    select: {
      color: '#b700ff'
    }
  },
  dataLabels: {
    enabled: false,
    format: '{point.name}'
  },
  //borderWidth: 2,
  allowPointSelect: true,
  cursor: 'pointer',
  point: {
    events: {
      select: function() {
        var value = this.value;
        if (value === -1) {
          $('#val').text('Selected Value: ' + this.name + ' - No Data');
        } else {

          var color = '#005645';
          $('#val').text('Selected Value: ' + this.name + ' - ' + value);
          var chart = $('.chart:eq(1)').highcharts();

          //var map = $.extend(true, {}, regionMaps[this.region-1]);
          //$('.chart:eq(0)').highcharts().series[1].setData(map.data);

          // remove previously region line
          chart.yAxis[0].removePlotLine('plot-line-1');
          chart.yAxis[0].removePlotLine('plot-band-1');
          chart.yAxis[0].addPlotLine(
            {
              value: value,
              width: 3,
              color: color,
              id: 'plot-line-1',
              dashStyle: 'longdash',
              label: {
                text: this.name + ' (' + this.value.toFixed(2) + ')',
                align: 'right',
                style: {
                  fontSize: '11pt'
                }
              },
              zIndex: 99
            }
          );

          var error = getCurrentCountyError(this.name);

          chart.yAxis[0].addPlotBand(
            {
              from : error[0].toFixed(rounding),
              to : error[1].toFixed(rounding),
              color : 'rgba(50, 50, 50, 0.2)',
              id: 'plot-band-1'
            }
          );

          var min = chart.yAxis[0].getExtremes().min;
          var max = chart.yAxis[0].getExtremes().max;
          var tick = chart.yAxis[0].tickInterval;

          if (max - (tick / 2) < error[1]) {
            chart.yAxis[0].setExtremes(min, error[1] + tick);
          }

          // Bring label to front
          chart.yAxis[0].plotLinesAndBands[0].label.toFront();

          if (this.region) {
            var region = this.region;
            $.each(chart.series, function(index, series) {

              if (series.name === regionNames[region-1] || series.name === 'Wisconsin') {
                series.show();
              } else {
                series.hide();
              }
            });

            // var errorbar = $('input[name="errorbar"]').bootstrapSwitch('state');
            // var linked = chart.series[(region-1)*2];
            // if (!errorbar && linked.linkedSeries) {
            //   linked.linkedSeries[0].hide();
            // }
          }
        }

      },
      unselect: function() {
        // only remove current line if toggling (not switching to another region)
        if (this.selected) {
          var region = this.region;
          var chart = $('.chart:eq(1)').highcharts();
          chart.yAxis[0].removePlotLine('plot-line-1');
          chart.yAxis[0].removePlotLine('plot-band-1');
          $('#val').text('Selected Value: No region selected');

          if (region) {
            chart.series[(region-1)*2].hide();
            //$('.chart:eq(0)').highcharts().series[1].setData({});
          }
        }
      }
    }
  }
};
