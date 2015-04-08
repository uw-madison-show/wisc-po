// JSHint options:
/* global $, App */
'use strict';

/**
* Contains all functions and properties relating to data
* @namespace App.data
* @prop currentMap  {Object}  Current data that is loaded into the map (county data)
* @prop currentLine {Object}  Current data that is loaded into the chart (everything but county data)
* @prop gotData     {boolean} If the app has gotten the json data
* @prop json        {Object}  Loaded json data
*/
App.data = {
  currentMap: {},
  currentLine: {},
  gotData: false,
  json: {},
};

/**
 * Transform the given data to
 * @method transformData
 * @memberof App.data
 * @param {number}  value   Value of the data point
 * @param {number}  error   Error of the data point
 * @param {boolean} percent Whether the value is a percent or not
 * @param {String}  area    Area level
 * @return ArrayExpression  The transformed data in the form [value, errorNeg, errorPos]
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
 * Get data for the given area, returns a series usable by highcharts
 * @method getAreaData
 * @memberof App.data
 * @param {String} area       The area ('county', 'region', 'state', etc)
 * @param {String} indicator  The variable name of the indicator
 * @return {Object}           A series representation of the indicator
 */
App.data.getAreaData = function(area, indicator) {

  if (App.data.json[area][indicator]) {
    var areaData = $.extend(true, {}, App.data.json[area][indicator]);
    var percent = (areaData.data_type === 'percent');

    areaData.error = [];
    $.each(areaData.observations, function(i1, observation) {
      areaData.error.push({});
      areaData.error[i1].data = [];
      // areaData.error[i1].id = observation.id;
      areaData.error[i1].name = observation.name + ' - Confidence';
      areaData.error[i1].parent = observation.parent;

      var newData = [];

      observation.sample = {};

      $.each(observation.data, function(i2, data) {

        newData = App.data.transformData(data[1], data[2], percent, area);
        areaData.error[i1].data[i2] = [data[0], newData[1], newData[2]];
        data[1] = newData[0];

        // Add sample size to Object as a property
        observation.sample[data[0]] = data[3];

        // Cut out error and sample size from data
        data.splice(2, 2);
      });


      if (area === 'county') {
        observation.value = observation.data[0][1];
        observation.region = observation.parent;
        observation['hc-key'] = observation.id;
        var color = App.misc.convertColor(App.maps.regionColors[observation.region-1], observation.value / 50, App.misc.colors.white);

        if (App.sample) {
          color = App.maps.regionColors[observation.region-1];
        }
        observation.color = App.misc.toRGB(color);

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
 * Get data for the given county. Will use the current indicator as defined by {@link App.data.currentMap}
 * @method getCurrentCountyData
 * @memberof App.data
 * @param {String} county   The county to retrieve data for
 * @return {Object}         The data for the given county
 */
App.data.getCurrentCountyData = function(county) {
  var data = $.grep(App.data.currentMap.observations, function (item) {
    return item.name.toLowerCase() === county.toLowerCase();
  });

  if (data[0]) {
    return data[0];
  } else {
    return [2008, -1, -1];
  }
};

/**
 * Get error data for the given county. Will use the current indicator as defined by {@link App.data.currentMap}
 * @method getCurrentCountyError
 * @memberof App.data
 * @param {String} county   The county to retrieve data for
 * @return {Object}         The error data for the given county
 */
App.data.getCurrentCountyError = function(county) {
  var data = $.grep(App.data.currentMap.error, function (item) {
    return item.name.toLowerCase() === (county + ' - Confidence').toLowerCase();
  });

  if (data[0]) {
    return data[0].data[0];
  } else {
    return [2008, -1, -1];
  }
};

/**
 * Get all data for the given indicator for the line chart. This currently
 * includes region and state data.
 * @method getLineData
 * @memberof App.data
 * @param {String} indicator  The given indicator to get data for
 * @return {array}
 */
App.data.getLineData = function(indicator) {
  var regionData = App.data.getAreaData('region', indicator);
  var stateData = App.data.getAreaData('state', indicator);
  var lineData = [];

  if (!$.isEmptyObject(regionData)) {
    lineData.data_type = regionData.data_type;

    $.each(regionData.observations, function() {
      this.visible = false;
      lineData.push(this);
    });

    $.each(regionData.error, function(i) {
      this.type = 'errorbar';
      this.color = App.misc.toRGB(App.maps.regionColors[i]);
      this.lineWidth = '1.5';
      this.visible = false;
      lineData.push(this);
    });
  }

  if (!$.isEmptyObject(stateData)) {
    lineData.push(stateData.observations[0]);

    var stateError = stateData.error[0];
    stateError.type = 'errorbar';
    stateError.color = '#f15c80';
    stateError.lineWidth = '1.5';
    stateError.visible = $('input[name="errorbar"]').bootstrapSwitch('state');
    lineData.push(stateError);
  }

  // Sort the line data in ascending order based on name
  lineData.sort(function(a,b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
    return 0;
    }
  });

  return lineData;
};

/**
 * Download the data.json file from the server, handle errors as well
 * @method getData
 * @memberof App.data
 * @param {Deferred} d1   An object which is used to handle a callback in
 * {@link App.misc.initTemplates}
 * @return {Void}
 */
App.data.getData = function(d1) {
  $.getJSON('data/data.json', function(jsonData) {
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
  }).fail(function() {
    $('#content').html(App.templates.error);
    d1.fail();
  });
};
