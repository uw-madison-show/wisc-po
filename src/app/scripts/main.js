// JSHint options:
/* global data, lineData, Highcharts, setTimeout, $, console */
'use strict';

console.log('\'Allo \'Allo!');


var color = [
  '#AA3C39',
  '#236467',
  '#AA6D39',
  '#2D8632',
  '#AA8E39'
];

var color2 = [
  'rgba(170, 60, 57, ',
  'rgba(35, 100, 103, ',
  'rgba(170, 109, 57, ',
  'rgba(45, 134, 50, ',
  'rgba(170, 142, 57, '
];

// Print out a list of this data

for (var i = 0; i < data.length; i++) {
  // Make the data random and fun :)
  //data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
  data[i].y = data[i].value;
  data[i].borderColor = color[data[i].region - 1];
  data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

  $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
      '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
}

// Initiate the map
var mapChartOptions = {
  chart: {
    backgroundColor: null,
    renderTo: 'chart1'
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

new Highcharts.Map(mapChartOptions);

var columnChartOptions = {
  chart: {
    type: 'column',
    renderTo: 'chart2',
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
    min: 0,
    max: 1000,
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

new Highcharts.Chart(columnChartOptions);

var lineChartOptions = {
  chart: {
    zoomType: 'xy',
    renderTo: 'line1'
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


for (var i = 0; i < lineData.length; i++) {
  var lineError = [];
  var lineFinal = [];
  for (var j = 0; j < lineData[i].length; j++) {
    lineFinal[j] = lineData[i][j].value;
    lineError[j] = [
      lineData[i][j].value - lineData[i][j]['Margin of Error'],
      lineData[i][j].value + lineData[i][j]['Margin of Error']
    ];
  }

  lineChartOptions.series.push({
    name: 'Hypertension Rate, Region ' + (i+1),
    // TODO: spline or line???
    type: 'line',
    data: lineFinal,
    tooltip: {
      pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.3f}%</b><br>'
    },
    color: color[i]
  }, {
    name: 'Measurement error',
    type: 'errorbar',
    data: lineError,
    tooltip: {
      pointFormat: '(error range: {point.low:.3f} to {point.high:.3f}%)<br/>'
    },
    color: color[i]
  });

}

var lineChart = new Highcharts.Chart(lineChartOptions);

for(var i = 0; i < lineChart.series.length; i++) {
  if (lineChart.series[i].type === 'errorbar' && lineChart.series[i-1].visible) {
    lineChart.series[i].hide();
  }
}

function randomData() {
  console.log('randomness!');

  $('#myTable tbody').empty();

  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
    data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

    $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
        '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
  }

  setTimeout(function(){ $('#chart1').highcharts().series[0].setData(data); }, 200);
  setTimeout(function(){ $('#chart2').highcharts().series[0].setData(data); }, 200);
}



/* Set up watchers */
$('#minusIcon').hide();
$('#collapseOne').on('hide.bs.collapse', function () {
  $('#plusIcon').show();
  $('#minusIcon').hide();
});

$('#collapseOne').on('show.bs.collapse', function () {
  $('#plusIcon').hide();
  $('#minusIcon').show();
});

$('#randomData').on('click', function() { randomData(); } );

$('input[name="numcharts"]').change(function() {
  var chart1 = $('#chart1');
  var chart2 = $('#chart2');
  if ($(this).val() === '1') {
    chart1.parent().removeClass('col-md-6');
    chart2.parent().hide();
    chart1.highcharts().reflow();
    chart1.highcharts().redraw();
    // chart1.highcharts().series[0].setData(data);

  } else {
    chart1.parent().addClass('col-md-6');
    chart2.parent().show();
    chart1.highcharts().reflow();
    chart1.highcharts().redraw();
    chart2.highcharts().reflow();
    chart2.highcharts().redraw();
  }
});

$('input[name="errorbar"]').change(function() {
  for(var i = 0; i < lineChart.series.length; i++) {
    if (lineChart.series[i].type === 'errorbar' && lineChart.series[i-1].visible) {
      if ($(this).val() === 'true') {
        lineChart.series[i].show();
      }
      else {
        lineChart.series[i].hide();
      }
    }
  }
});

/* End watchers */