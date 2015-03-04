// JSHint options:
/* global $, chartOptions, dataCounty, mapSeries, templates, getData, downloadWatchers */
/* exported randomData, createChart, createMap, humanize, initTemplates */
'use strict';

// TODO: fix JSHint

/* Helper functions */
var gotData = false;

function initTemplates() {
  var d1 = $.Deferred();

  if (!gotData) {
    getData(d1);
    gotData = true;
  } else {
    d1.resolve();
  }

  $.when(d1).done(function() {
    if (window.location.href.match(/\#.*/)) {
      var page = window.location.href.match(/\#.*/)[0].substring(1);
      if (page) {
        $('#content').html(templates[page]);

        // Init toggle switches
        $('.bootstrapSwitch').bootstrapSwitch();

        if (page === 'data') {
          $('#minusIcon').hide();
          fillTable();
          downloadWatchers();
        } else if (page === 'charts') {
          setupCharts();
        }
      } else {
        $('#content').html(templates.index);
      }
    } else {
      $('#content').html(templates.index);
    }
  });
}

function createChart(chart, type, series, xAxis, yAxis, name) {
  var options = $.extend(true, {}, chartOptions);
  //var container = chart.closest('.chartContainer');

  options.series = $.extend(true, [], series);

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
      var mapOpts = $.extend(true, {}, mapOptions);
      options.colorAxis = mapOpts.colorAxis;
      options.tooltip = mapOpts.tooltip;

      chart.highcharts('Map', options);
      break;
  }
}

function createMap(chart, series, map, name) {
  var seriesNew = new Array($.extend(true, {}, mapSeries));

  seriesNew[0].data = series;
  seriesNew[0].mapData = map;
  seriesNew[0].name = name;

  seriesNew.push({
    'type': 'mapline',
    'name': 'Borders',
    'color': 'black',
    'data': [regionMaps[0].data[0], regionMaps[1].data[0], regionMaps[2].data[0],
      regionMaps[3].data[0], regionMaps[4].data[0]],
    'enableMouseTracking': false
  });

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
