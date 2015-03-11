// JSHint options:
/* global $, App */

'use strict';

App.charts = {};

App.charts.createChart = function(chart, type, series, xAxis, yAxis, name) {
  var options = $.extend(true, {}, App.charts.chartOptions);
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
      var mapOpts = $.extend(true, {}, App.charts.mapOptions);
      options.colorAxis = mapOpts.colorAxis;
      options.tooltip = mapOpts.tooltip;
      options.legend = mapOpts.legend;
      chart.highcharts('Map', options);
    break;
  }
};

App.charts.createMap = function(chart, series, map, name) {
  var seriesNew = new Array($.extend(true, {}, App.charts.mapSeries));

  seriesNew[0].data = series;
  seriesNew[0].mapData = map;
  seriesNew[0].name = name;

  seriesNew.push({
    'type': 'mapline',
    'name': 'Borders',
    'color': 'black',
    'data': App.maps.region,
    'enableMouseTracking': false
  });

  App.charts.createChart(chart, 'map', seriesNew, [], [], name);
};

App.charts.setupCharts = function() {

  // Set default indicator and name based on dropdown default
  var defaultIndicator = $('.dropDownIndicators option:selected').data('variable');
  var name = $('.dropDownIndicators option:selected').val();

  // Set up map
  App.data.currentMap = App.data.getAreaData('county', defaultIndicator);
  App.charts.createMap($('.chart:eq(0)'), App.data.currentMap.observations, App.maps.county, name);

  // Set up line chart
  App.data.currentLine = App.data.getLineData(defaultIndicator);
  App.charts.createChart($('.chart:eq(1)'), 'line', App.data.currentLine, [], App.data.y, name);

  var chart = $('.chart:eq(1)').highcharts();
  // Hide all except WI and US, show/hide errorbars based on value of checkbox
  var errorbar = $('input[name="errorbar"]').bootstrapSwitch('state');
  $.each(chart.series, function() {
    if (this.name === 'Wisconsin' || this.name === 'United States') {
      this.show();
    } else if (this.options.type !== 'errorbar' || !errorbar) {
      this.hide();
    }
  });

  // Label things by percent or value
  var percent = (App.data.currentLine.data_type === 'percent');
  var label = percent ? 'Percent %' : 'Value';
  $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: label});

  // Set up watchers for charts and options
  App.watchers.chartWatchers();
};
