// JSHint options:
/* global data, $, chartOptions, mapSeries, color2 */
/* exported randomData, createChart, createMap */
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
  //setTimeout(function(){ $('.chart:eq(1)').highcharts().series[0].setData(data); }, 200);
}

function createChart(chart, type, series, xAxis, yAxis) {
  var options = $.extend(true, {}, chartOptions);
  var container = chart.closest('.chartContainer');
  options.series = series;

  if (xAxis) {
    if (xAxis.length !== 0) {
      options.xAxis = xAxis;
    }
  }

  if (yAxis) {
    if (yAxis.length !== 0) {
      options.yAxis = yAxis;
    }
  }

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
      options.chart.type = 'map';
      chart.highcharts('Map', options);
      container.find('.dropDownC').prop('disabled', true);
      break;
  }
}

function createMap(chart, series, map) {
  var seriesNew = new Array($.extend(true, {}, mapSeries));
  seriesNew[0].data = series;
  seriesNew[0].mapData = map;
  createChart(chart, 'map', seriesNew);
}

function createChart(chart, type, series) {
  createChart(chart, type, series, [], []);
}

/* End helper funtions */
