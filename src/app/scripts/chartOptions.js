// Chart options

var mapChartOptions = {
  chart: {
    backgroundColor: null
  },
  title : {
    text : 'Highmaps basic demo'
  },
  subtitle : {
    text : 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-wi-all.js">Wisconsin</a>'
  },
  /*
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },
  colorAxis: {
    min: 0,
    max: 1000
  },
  */
  series : [{
    data : data,
    mapData: Highcharts.maps['countries/us/us-wi-all'],
    joinBy: 'hc-key',
    name: 'Random data',
    states: {
      hover: {
        color: '#CB6'
      }
    },
    dataLabels: {
      enabled: false,
      format: '{point.name}'
    },
    borderWidth: 3
  }]
};

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
  xAxis: {
    title: {
      text: 'Index Number'
    }
  },
  yAxis: {
    title: {
      text: 'Random Data'
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
    name: 'Random data'
  }]
};

var lineChartOptions = {
  chart: {
    type: 'line',
    backgroundColor: null
  },
  title: {
    text: 'Highcharts basic demo'
  },
  subtitle: {
    text: 'Source: Random'
  },
  xAxis: {
    title: {
      text: 'Index Number'
    }
  },
  yAxis: {
    title: {
      text: 'Random Data'
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
    name: 'Random data'
  }]
};


var errorChartOptions = {
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Hypertension Across Wisconsin'
  },
  xAxis: [{
    categories: ['2008', '2009', '2010', '2011', '2012', '2013']
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      formatter: function() {
        return this.value + '%';
      }
    },
    title: {
      text: 'Percentage'
    }
  }],
  tooltip: {
    shared: true
  },
  plotOptions: {
    series: {
      events: {
        legendItemClick: function() {
          if (!this.visible && $('input[name="errorbar"]:checked').val() === 'false') {
            this.show();

            this.linkedSeries[0].hide();
            return false;
          }
        }
      }
    }
  },

  series: []
};