// JSHint options:
/* global $, createChart, createMap, dropDownIndicators, county, rounding, y, chartWatchers, helperSetup */
/* exported initCharts, getCounty, getCurrentCountyData, getCurrentCountyError, getData, percent, setupCharts */

'use strict';

var percent = {};
var data = {};
var currentMap = {};
var currentLine = {};

function transformData(value, error, percent) {
  var errorPos = -1;
  var errorNeg = -1;

  if (value) {
    errorPos = parseFloat(((value + error) * (percent ? 100 : 1)).toFixed(rounding));
    errorNeg = parseFloat(((value - error) * (percent ? 100 : 1)).toFixed(rounding));
    value = parseFloat(((value) * (percent ? 100 : 1)).toFixed(rounding));
  } else {
    value = -1;
  }

  return [value, errorNeg, errorPos];
}

function getAreaData(area, indicator) {
  var areaData = $.extend(true, {}, data[area][indicator]);
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

        newData = transformData(data[1], data[2], percent);
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
}

function getCurrentCountyData(county) {
  var data = $.grep(currentMap.observations, function (item) {
    return item.name === county;
  });
  return data[0];
}

function getCurrentCountyError(county) {
  var data = $.grep(currentMap.error, function (item) {
    return item.name === county + ' - Error';
  });

  return data[0].data[0];
}

function getLineData(indicator) {
  var regionData = getAreaData('region', indicator);
  var stateData = getAreaData('state', indicator);
  var lineData = [];

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
}

function setupCharts() {

  // Set default indicator and name based on dropdown default
  var defaultIndicator = $('.dropDownIndicators option:selected').data('variable');
  var name = $('.dropDownIndicators option:selected').val();

  // Set up map
  currentMap = getAreaData('county', defaultIndicator);
  createMap($('.chart:eq(0)'), currentMap.observations, county, name);

  // Set up line chart
  currentLine = getLineData(defaultIndicator);
  createChart($('.chart:eq(1)'), 'line', currentLine, [], y, name);

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
  var percent = (currentLine.data_type === 'percent');
  var label = percent ? 'Percent %' : 'Value';
  $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: label});

  // Set up watchers for charts and options
  chartWatchers();
}

function getData(d1) {
  $.getJSON('data/data.json', function(jsonData) {
    data = jsonData;

    // Set up dropdowns
    $.each(data, function() {
      $.each(this, function(name) {
        dropDownIndicators[name] = [this.name, name];
      });
    });

    // Set up helpers for templates
    helperSetup();

    // Resolve callback after data gotten to begin data processing and then charts
    d1.resolve();
  });
}
