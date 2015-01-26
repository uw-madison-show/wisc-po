// JSHint options:
/* global Highcharts, data, dataRegion */
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
          console.log(this);
          if (!this.visible && $('input[name="errorbar"]:checked').val() === 'false' && this.linkedSeries.length === 2) {
            this.show();

            this.linkedSeries[0].hide();
            return false;
          }
        }
      }
    }
  },
  series : [{
    data : data,
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
  data : data,
  mapData: Highcharts.maps['countries/us/us-wi-all'],
  joinBy: 'hc-key',
  name: 'Random data',
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
        var color = '#005645';
        $('#val').text('Value: ' + this.name + ' - ' + value);

        // remove previously region line
        $('.chart:eq(1)').highcharts().yAxis[0].removePlotLine('plot-band-1');
        $('.chart:eq(1)').highcharts().yAxis[0].addPlotLine(
          {
            value: value,
            width: 3,
            color: color,
            id: 'plot-band-1',
            dashStyle: 'longdash',
            label: {
              text: this.name + ' (' + this.value + ')',
              align: 'right',
              style: {
                fontSize: '12pt'
              }
            }
          }
        );

        if (this.region) {
          var region = this.region;
          var val = dataRegion[region-1].value;
          $('.chart:eq(1)').highcharts().series[0].setData([val, val, val, val, val]);
        }

      },
      unselect: function() {
        // only remove current line if toggling (not switching to another region)
        if (this.selected) {
          $('.chart:eq(1)').highcharts().yAxis[0].removePlotLine('plot-band-1');
          $('#val').text('Value: No region selected');
        }
      }
    }
  }
};
