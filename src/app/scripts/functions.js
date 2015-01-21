// JSHint options:
/* global data, $, chartOptions, mapChartOptions, color2 */
/* exported randomData, createChart */
'use strict';

/* Helper functions */

function randomData() {
  $('#myTable tbody').empty();

  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
    data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

    $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
        '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
  }

  setTimeout(function(){ $('.chart:eq(0)').highcharts().series[0].setData(data); }, 200);
  setTimeout(function(){ $('.chart:eq(1)').highcharts().series[0].setData(data); }, 200);
}

function createChart(chart, type) {
  var options = $.extend(true, {}, chartOptions);
  switch (type) {
    case 'line':
      options.chart.type = 'line';
      chart.highcharts(options);
      break;
    case 'spline':
      options.chart.type = 'spline';
      chart.highcharts(options);
      break;
    case 'column':
      options.chart.type = 'column';
      chart.highcharts(options);
      break;
    case 'pie':
      options.chart.type = 'pie';
      chart.highcharts(options);
      break;
    case 'map':
      chart.highcharts('Map', $.extend(true, {}, mapChartOptions));
      break;
  }
}

/* End helper funtions */