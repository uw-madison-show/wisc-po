// JSHint options:
/* global Highcharts, csv */
/* exported chartOptions, mapSeries */

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
    text: 'Source: Random'
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
  }]
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
          value = 'No Data';
        }
        var color = '#005645';
        var chart = $('.chart:eq(1)').highcharts();
        $('#val').text('Value: ' + this.name + ' - ' + value.toFixed(2));

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

        var index = $('.chartSelect .dropDownA option:selected').index();
        var error = csv[index*2+1].data[this.index];

        chart.yAxis[0].addPlotBand(
          {
            from : error[0],
            to : error[1],
            color : 'rgba(50, 50, 50, 0.2)',
            id: 'plot-band-1'
          }
        );

        // Bring label to front
        $('.chart:eq(1)').highcharts().yAxis[0].plotLinesAndBands[0].label.toFront();

        if (this.region) {
          var region = this.region;
          for (var i = 0; i < 5; i++) {
            chart.series[i*2].hide();
          }
          chart.series[(region-1)*2].show();

          var errorbar = $('input[name="errorbar"]').bootstrapSwitch('state');
          var linked = chart.series[(region-1)*2];
          if (!errorbar && linked.linkedSeries) {
            linked.linkedSeries[0].hide();
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
          $('#val').text('Value: No region selected');

          if (region) {
            chart.series[(region-1)*2].hide();
          }
        }
      }
    }
  }
};
