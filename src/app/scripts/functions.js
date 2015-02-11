// JSHint options:
/* global $, chartOptions, csv, mapSeries */
/* exported randomData, createChart, createMap, humanize */
'use strict';

/* Helper functions */

function createChart(chart, type, series, xAxis, yAxis, name) {
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

  if (name) {
    options.title.text = name;
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
        stops: [
        [0, '#666666'],
        [0.001, '#fbfbfb'],
        [1.0, '#005645'],
        ],
        min: 0
      };

      options.tooltip = {
        formatter: function () {
          var val = this.point.value.toFixed(2);
          if (this.point.value === -1) {
            val = 'No Data';
          }

          var index = $('.chartSelect .dropDownA option:selected').index();
          var error = csv[index*2+1].data[this.point.index];
          var err;

          if (error[0] && error[1]) {
            err = 'Error Range: (' + error[0].toFixed(2) + ' - ' + error[1].toFixed(2) + ')';
          } else {
            err = '';
          }

          return '<b>' + this.series.name + '</b><br>' +
          'Point name: ' + this.point.name + '<br>' +
          'Value: ' + val + '<br>' + err;
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

  createChart(chart, 'map', seriesNew, [], [], name);
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
