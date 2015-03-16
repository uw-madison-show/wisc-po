// JSHint options:
/* global Highcharts, App */
'use strict';

App.charts.chartOptions = {
  chart: {
    type: 'column',
    backgroundColor: null
  },
  title: {
    text: 'Highcharts basic demo'
  },
  subtitle: {
    text: 'Source: UW SHOW Data'
  },
  plotOptions: {
    series: {
      events: {
        /**
         * Description
         * @method legendItemClick
         * @memberof App.charts.chartOptions
         * @return {boolean}
         */
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
      /**
       * Description
       * @method formatter
       * @memberof App.charts.chartOptions
       * @return MemberExpression
       */
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

App.charts.mapOptions = {
  legend: {
    enabled: false
  },
  tooltip: {
    /**
     * Description
     * @method formatter
     * @memberof App.charts.mapOptions
     * @return BinaryExpression
     */
    formatter: function () {
      var val = 'Value: ' + this.point.value;
      var err = '';
      if (this.point.value === -1) {
        if (this.point.sample) {
          val = 'Sample Size: ' + this.point.sample;
        } else {
          val = 'No Data';
        }
      } else {
        var error = App.data.getCurrentCountyError(this.point.name);
        err = 'Error Range: (' + error[1] + ' - ' + error[2] + ')';
      }

      return '<b>' + this.series.name + '</b><br>' +
      'Point name: ' + this.point.name + '<br>' +
      'Region: ' + App.maps.regionNames[this.point.region-1] + '<br>' +
      val + '<br>' + err;
    }
  }
};

if (!App.sample) {
  App.chart.mapOptions.colorAxis = {
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
  };
}

App.charts.mapSeries = {

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
      /**
       * Description
       * @method select
       * @memberof App.charts.mapSeries
       * @return {Void}
       */
      select: function() {
        var value = this.value;
        var color = '#005645';

        if (!App.sample) {
          if (value === -1) {
            $('#val').text('Selected Value: ' + this.name + ' - No Data');
          } else {
            $('#val').text('Selected Value: ' + this.name + ' - ' + value);
          }
        }

        var chart = $('.chart:eq(1)').highcharts();

        //var map = $.extend(true, {}, regionMaps[this.region-1]);
        //$('.chart:eq(0)').highcharts().series[1].setData(map.data);

        if (!App.sample) {
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
                text: this.name + ' (' + this.value + ')',
                align: 'right',
                style: {
                  fontSize: '11pt'
                }
              }

            }
          );

          // Bring label to front
          // console.log(chart.yAxis[0].plotLinesAndBands[0]);
          // chart.yAxis[0].plotLinesAndBands[0].options.label.toFront();

          var error = App.data.getCurrentCountyError(this.name);
          chart.yAxis[0].addPlotBand(
            {
              from : error[1],
              to : error[2],
              color : 'rgba(50, 50, 50, 0.2)',
              id: 'plot-band-1'
            }
          );

          var min = chart.yAxis[0].getExtremes().min;
          var max = chart.yAxis[0].getExtremes().dataMax;
          var tick = chart.yAxis[0].tickInterval;

          if (max < error[2]) {
            chart.yAxis[0].setExtremes(min, error[2] + tick);
          } else {
            chart.yAxis[0].setExtremes(null, null);
          }
        }

        if (this.region) {
          var region = this.region;
          $.each(chart.series, function(index, series) {

            // Hide all series except State and selected region
            if (series.name === App.maps.regionNames[region-1] || series.name === 'Wisconsin') {
              series.show();
            } else {
              series.hide();
            }
          });
        }

      },

      /**
       * Description
       * @method unselect
       * @memberof App.charts.mapSeries
       * @return {Void}
       */
      unselect: function() {
        // only remove current line if toggling (not switching to another region)
        if (this.selected) {
          var region = this.region;
          var chart = $('.chart:eq(1)').highcharts();
          chart.yAxis[0].removePlotLine('plot-line-1');
          chart.yAxis[0].removePlotLine('plot-band-1');
          $('#val').text('Selected Value: No region selected');

          if (region) {
            $.each(chart.series, function(index, series) {
              if (series.name === App.maps.regionNames[region-1]) {
                series.hide();
              }
            });
          }

          // Reset min/max (autoscale again)
          chart.yAxis[0].setExtremes(null, null);
        }
      }

    }
  }
};
