// JSHint options:
/* global $, App */
'use strict';

/**
* @namespace App.charts
* @prop chartOptions  {Object}  The default chart options
* @prop mapOptions    {Object}  The default map options (which are in addition to chart options)
* @prop mapSeries     {Object}  The default options for a map series
* @prop x             {number}  Default x axis configuration
* @prop y             {number}  Current data that is loaded into the chart (everything but county data)
*/
App.charts = {
  x: { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'] },
  y: { title: { text: 'Percent %'}, min: 0 }
};

/**
 * Description Creates a chart with the given parameters if specified, otherwise
 * uses defaults for not defined variables
 * @method createChart
 * @memberof App.charts
 * @param {jQueryRef}   chart   jQuery reference to the object to inject the chart into
 * @param {String}      type    String of which type of chart to create - based off
 * Highcharts chart types (Can include 'bar', 'line', 'map', 'pie').
 * @param {Array}       series  Series to plot on the chart (as defined by Highcharts
 *  at {@link http://api.highcharts.com/highcharts#series})
 * @param {Object}      xAxis   Optional options for the xAxis (as defined by
 * Highcharts at {@link http://api.highcharts.com/highcharts#xAxis})
 * @param {Object}      yAxis   Optional options for the yAxis (as defined by
 * Highcharts at {@link http://api.highcharts.com/highcharts#yAxis})
 * @param {String}      name    Optional name for the chart (else will use default)
 * @return  {Void}
 */
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

/**
 * A wrapper for the {@link App.charts.createChart} function. This one takes similar
 * variables, but adds some functionality to further set up a map with defaults
 * @method createMap
 * @memberof App.charts
 * @param {jQueryRef}   chart   jQuery reference to the object to inject the chart into
 * @param {Array}       series  Series to plot on the chart (as defined by Highcharts
 *  at {@link http://api.highcharts.com/highcharts#series})
 * @param {Object}      map     Map to use for chart, chosen from those within
 * {@link App.maps} or by downloading additional maps from Highcharts at
 * {@link http://code.highcharts.com/mapdata/}
 * @param {String}      name    Optional name for the chart (else will use default)
 * @return {Void}
 */
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

/**
 * Description Function which initialzes the charts, this also calls
 * {@link App.watchers.chartWatchers} to set up the jQuery watchers for the page.
 * @method setupCharts
 * @memberof App.charts
 * @return {Void}
 */
App.charts.setupCharts = function() {

  // Set default indicator and name based on dropdown default
  var defaultIndicator = $('.dropDownIndicators option:selected').data('variable');
  var name = $('.dropDownIndicators option:selected').val();

  // Set up map
  App.data.currentMap = App.data.getAreaData('county', defaultIndicator);
  App.charts.createMap($('.chart:eq(0)'), App.data.currentMap.observations, App.maps.county, name);

  // Set up line chart
  App.data.currentLine = App.data.getLineData(defaultIndicator);
  App.charts.createChart($('.chart:eq(1)'), 'line', App.data.currentLine, [], App.charts.y, name);

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

  $('#description').text('*Description of Indicator: ' + App.data.getDescription('state', defaultIndicator));

  // Set up watchers for charts and options
  App.watchers.chartWatchers();
};
