// JSHint options:
/* global data, $, chartOptions, mapSeries */
/* exported randomData, createChart, createMap, humanize */
'use strict';

/* Helper functions */

function randomData() {
  $('#myTable tbody').empty();

  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 100) + 1);
    data[i].y = data[i].value;
    //data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

    $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
        '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
  }

  setTimeout(function(){ $('.chart:eq(0)').highcharts().series[0].setData(data); }, 200);
  //setTimeout(function(){ $('.chart:eq(1)').highcharts().series[0].setData(data); }, 200);
}

function createChart(chart, type, series, xAxis, yAxis) {
  var options = $.extend(true, {}, chartOptions);
  //var container = chart.closest('.chartContainer');
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

      options.colorAxis = {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645'
      };

      options.tooltip = {
        formatter: function () {
          var val = this.point.value;
          if (this.point.value === -1) {
            val = 'No Data';
          }
          return '<b>' + this.series.name + '</b><br>' +
          'Point name: ' + this.point.name + '<br>' +
          'Value: ' + val;
        }
      };

      chart.highcharts('Map', options);
      //container.find('.dropDownC').prop('disabled', true);
      break;
  }
}

function createMap(chart, series, map, name) {
  var seriesNew = new Array($.extend(true, {}, mapSeries));
  seriesNew[0].data = series;
  seriesNew[0].mapData = map;
  seriesNew[0].name = name;
  createChart(chart, 'map', seriesNew);
}

/* Useful little function found at:
  http://stackoverflow.com/questions/21792367/replace-underscores-with-spaces-and-capitalize-words
*/
function humanize(str) {
  var frags = str.split('_');
  for (var i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

/* End helper funtions */
