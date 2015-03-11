// JSHint options:
/* global $, App */

'use strict';

App.data = {
  currentMap: {},
  currentLine: {},
  gotData: false,
  json: {},
  x: { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'] },
  y: { title: { text: 'Percent %'}, min: 0 }
};

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

App.data.getCurrentCountyData = function(county) {
  var data = $.grep(App.data.currentMap.observations, function (item) {
    return item.name === county;
  });
  return data[0];
};

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
