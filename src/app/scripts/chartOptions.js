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
  exporting: {
    formAttributes: {
      target: '_blank'
    }
  },
  plotOptions: {
    series: {
      events: {
        /**
         * Legend item series function, shows/hides error bars based on errorbar options
         * @method legendItemClick
         * @memberof App.charts.chartOptions
         * @return {boolean}  Overrides the defualt behavior
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
    shared: true,

    formatter: function() {
      // console.log(this);
      var str = '<span style="font-size: 10px">' + this.points[0].key + '</span><br/>';

      $.each(this.points, function() {
        var sample = '';
        if (App.data.currentLine[this.series.index].sample) {
          sample = ', Sample Size: ' + App.data.currentLine[this.series.index].sample[this.point.x];
        }

        var value;
        if (this.point.low && this.point.high) {
          value = this.point.low + ' - ' + this.point.high;
        } else {
          value = this.point.y;
        }

        var color = this.series.color !== '#000000' ? this.series.color : '#aaaaaa';

        str += '<span style="color:' + color + '">●</span> ' +
        this.series.name + ': <b>' + value + '</b>' + sample + '<br/>';
      });

      return str;
    }
  },
  series : [{

    dataLabels: {
      enabled: true,
      /**
       * Formatter for data labels, not useful except for bar charts
       * @method formatter
       * @memberof App.charts.chartOptions
       * @return {String}   Formatted string for dataLabels
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    /**
     * Format the the tooltip for the map
     * @method formatter
     * @memberof App.charts.mapOptions
     * @return {String}   String represenation of the tooltip
     */
     formatter: function () {
       var color;
       var size;
       var sample = this.point.sample[2008];

       if (sample >= 75) {
         color = '#008000';
         size = 'Excellent';
       } else if (sample >= 40) {
         color = '#CC6600';
         size = 'Fair';
       } else if (sample) {
         color = '#CC0000';
         size = 'Poor';
       }

       var val = 'Value: ' + this.point.value;
       sample = '<span style="color: ' + color + '">Sample Size: ' + this.point.sample[2008] + ' (' + size + ')</span>';
       var err = '';
       if (this.point.value === -1 || App.sample) {
         val = '';
         if (!this.point.sample[2008]) {
           sample = 'No Data';
         }
       } else {
         var error = App.data.getCurrentCountyError(this.point.name);
         if (error[1] !== -1 && error[2] !== -1) {
          err = 'Error Range: (' + error[1] + ' - ' + error[2] + ')';
        } else {
          err = 'Error Range: No Data';
        }
       }

       return '<b>' + this.series.name + '</b><br>' +
       'Point name: ' + this.point.name + '<br>' +
       'Region: ' + App.maps.regionNames[this.point.region-1] + '<br>' +
       val + '<br>' + err + '<br>' + sample;
     }
  }
};

// if (!App.sample) {
//   App.charts.mapOptions.colorAxis = {
//     stops:
//       [
//         [0, '#666666'],
//         // [0.001, '#fbfbfb'],
//         // [1.0, '#005645'],
//         [0.001,'#f7fcf5'],
//         [0.125,'#e5f5e0'],
//         [0.25,'#c7e9c0'],
//         [0.375,'#a1d99b'],
//         [0.5,'#74c476'],
//         [0.625,'#41ab5d'],
//         [0.75,'#238b45'],
//         [0.875,'#006d2c'],
//         [1.0,'#00441b'],
//       ],
//     min: 0
//   };
// }

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
       * Select event fired on map click
       * @method select
       * @memberof App.charts.mapSeries
       * @return {Void}
       */
      select: function() {
        var value = this.value;
        var color = '#005645';

        if (this.sample[2008] < 40 && !App.sample) {
          $('#sampleAlert').slideDown();
        } else {
          $('#sampleAlert').slideUp();
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
          var errorbars = $('input[name="errorbar"]').bootstrapSwitch('state');
          var name = App.maps.regionNames[region-1];

          $.each(chart.series, function(index, series) {

            // Hide all series except State and selected region
            if (series.name === name || series.name === 'Wisconsin') {
              series.show();
              if (!errorbars) {
                series.linkedSeries[0].hide();
              }
            } else {
              if (series.visible && series.type !== 'errorbar') {
                series.hide();
              }
            }
          });

        }

      },

      /**
       * Unselect event fired on de-selection of an area on the map
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
          $('#sampleAlert').slideUp();


          if (region) {
            var name = App.maps.regionNames[region-1];
            $.each(chart.series, function(index, series) {
              if (series.name === name || series.name === (name + ' - Error')) {
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
