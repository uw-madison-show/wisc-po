// JSHint options:
/* global $, App */

'use strict';

/**
* @namespace App.data
* @memberof App
* @type {Object}
* @desc Chart object which holds important functions and templates for all charts/maps
* @property {Object}  data.currentMap   Current county data for the map
* @property {Object}  data.currentLine  Current data series for the line chart
* @property {Object}  data.gotData      If the app has yet retrieved and parsed the json data
* @property {Object}  data.json         Json data retrieved
* @property {Object}  data.x            Default x axis configuration
* @property {Object}  data.y            Default y axis configuration
*/
App.data = {
  currentMap: {},
  currentLine: {},
  gotData: false,
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

        // Add sample size to Object
        observation.sample = data[3];

        // Cut out error and sample size from data
        data.splice(2, 2);
      });


      if (area === 'county') {
        observation.value = observation.data[0][1];
        observation.region = observation.parent;
        observation['hc-key'] = observation.id;
        // observation.sample = observation.data[0][3];
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

/**
* @function
* @memberof App.data
* @desc                           Get the data (and error data) for the given indicator in all areas excluding county
* @param    {string}  indicator   Indicator to get data for
* @returns  {object}              Object containing the requested indicator's data and error data
*/
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

/**
* @function
* @memberof App.data
* @desc                           Get the json data for all areas and assign it to {@link App.data.json}
* @param    {deferred}  d1        A deferred object that must be resolved to continue (similar to a callback)
*/
App.data.getData = function(d1) {
  $.getJSON('data/data.json', function(jsonData) {

    /** @memberof App.data */
    App.data.json = jsonData;

    // Set up dropdowns
    $.each(App.data.json, function() {
      $.each(this, function(name) {
        App.dropDownIndicators[name] = [this.name, name];
      });
    });

    // Set up template helpers after data retrieved
    App.helpers.helperSetup();

    App.data.gotData = true;

    // Resolve callback after data downloaded
    d1.resolve();
  });
};
