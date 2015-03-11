// JSHint options:
/* global $, createChart, createMap, chartWatchers, helperSetup, App */
/* exported initCharts, getCounty, getCurrentCountyData, getCurrentCountyError, getData, setupCharts */

'use strict';

/**
* @namespace App.data
* @memberof App
* @type {Object}
* @desc Chart object which holds important functions and templates for all charts/maps
* @property {Object}  charts.currentMap   Current county data for the map
* @property {Object}  charts.currentLine  Current data series for the line chart
* @property {Object}  charts.json         Json data retrieved
* @property {Object}  charts.x            Default x axis configuration
* @property {Object}  charts.y            Default y axis configuration
*/
App.data = {
  currentMap: {},
  currentLine: {},
  json: {},
  x: { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'] },
  y: { title: { text: 'Percent %'}, min: 0 }
};


/**
* @function
* @memberof App.data
* @desc                       Transform data into an array which has errors calculated and deals with null values
* @param    {number}  value   Original data value
* @param    {number}  error   Error amount
* @param    {boolean} percent Whether the values are percentages
* @param    {string}  area    The area that the data is from
* @returns  {array}           Array of new values in the form [value, errorNeg, errorPos]
*/
App.data.transformData = function(value, error, percent, area) {
  var errorPos;
  var errorNeg;

  if (value) {
    errorPos = parseFloat(((value + error) * (percent ? 100 : 1)).toFixed(App.rounding));
    errorNeg = parseFloat(((value - error) * (percent ? 100 : 1)).toFixed(App.rounding));
    value = parseFloat(((value) * (percent ? 100 : 1)).toFixed(App.rounding));
  } else {
    errorPos = ((area === 'county') ? -1 : null);
    errorNeg = ((area === 'county') ? -1 : null);
    value = ((area === 'county') ? -1 : null);
  }

  return [value, errorNeg, errorPos];
};

/**
* @function
* @memberof App.data
* @desc                           Get data for the given area and indicator
* @param    {string}  area        Area to return data for
* @param    {string}  indicator   Indicator to return data for
* @returns  {object}              Object containing the requested data, or an empty object if no data exists
*/
App.data.getAreaData = function(area, indicator) {
  var areaData = $.extend(true, {}, App.data.json[area][indicator]);
  var percent = (areaData.data_type === 'percent');

  if (areaData) {
    areaData.error = [];
    $.each(areaData.observations, function(i1, observation) {
      areaData.error.push({});
      areaData.error[i1].data = [];
      // areaData.error[i1].id = observation.id;
      areaData.error[i1].name = observation.name + ' - Error';
      areaData.error[i1].parent = observation.parent;

      var newData = [];

      $.each(observation.data, function(i2, data) {

        newData = App.data.transformData(data[1], data[2], percent, area);
        areaData.error[i1].data[i2] = [data[0], newData[1], newData[2]];
        data[1] = newData[0];

        // Cut out error from data
        data.splice(2, 1);
      });


      if (area === 'county') {
        observation.value = observation.data[0][1];
        observation.region = observation.parent;
        observation['hc-key'] = observation.id;
        delete observation.parent;
        delete observation.data;
      } else {
        areaData.error[i1].linkedTo = observation.id;
      }

      // delete observation.id;
    });

    return areaData;
  } else {
    return {};
  }
};

/**
* @function
* @memberof App.data
* @desc                           Get data value for the given county based on {@link currentMap} data
* @param    {string}  county      County to return data for
* @returns  {object}              Object containing the requested county's data
*/
App.data.getCurrentCountyData = function(county) {
  var data = $.grep(App.data.currentMap.observations, function (item) {
    return item.name === county;
  });
  return data[0];
};

/**
* @function
* @memberof App.data
* @desc                           Get data error for the given county based on {@link currentMap} data
* @param    {string}  county      County to return data for
* @returns  {object}              Object containing the requested county's error data
*/
App.data.getCurrentCountyError = function(county) {
  var data = $.grep(App.data.currentMap.error, function (item) {
    return item.name === county + ' - Error';
  });

  return data[0].data[0];
};

App.data.getLineData = function(indicator) {
  var regionData = App.data.getAreaData('region', indicator);
  var stateData = App.data.getAreaData('state', indicator);
  var lineData = [];

  lineData.data_type = regionData.data_type;

  $.each(regionData.observations, function() {
    this.visible = false;
    lineData.push(this);
  });

  $.each(regionData.error, function() {
    this.type = 'errorbar';
    this.visible = false;
    lineData.push(this);
  });

  lineData.push(stateData.observations[0]);

  var stateError = stateData.error[0];
  stateError.type = 'errorbar';
  stateError.visible = $('input[name="errorbar"]').bootstrapSwitch('state');
  lineData.push(stateError);

  return lineData;
};

function setupCharts() {

  // Set default indicator and name based on dropdown default
  var defaultIndicator = $('.dropDownIndicators option:selected').data('variable');
  var name = $('.dropDownIndicators option:selected').val();

  // Set up map
  App.data.currentMap = App.data.getAreaData('county', defaultIndicator);
  createMap($('.chart:eq(0)'), App.data.currentMap.observations, App.maps.county, name);

  // Set up line chart
  App.data.currentLine = App.data.getLineData(defaultIndicator);
  createChart($('.chart:eq(1)'), 'line', App.data.currentLine, [], App.data.y, name);

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
  chartWatchers();
}

function getData(d1) {
  $.getJSON('data/data.json', function(jsonData) {
    App.data.json = jsonData;

    // Set up dropdowns
    $.each(App.data.json, function() {
      $.each(this, function(name) {
        App.dropDownIndicators[name] = [this.name, name];
      });
    });

    // Set up helpers for templates
    helperSetup();

    // Resolve callback after data gotten to begin data processing and then charts
    d1.resolve();
  });
}
