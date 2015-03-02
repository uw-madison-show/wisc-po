// JSHint options:
/* global $, humanize, createChart, createMap, regionDictionary, dropDownOptsA, dropDownOptsB, dropDownOptsC, county, y, chartWatchers */
/* exported initCharts, getCounty */
'use strict';

// TODO: fix JSHint

var numVars;
var categories = [];
var percent = {};
var dataCounty = [];
var dataRegion = [];
var dataState = [];

function transformData(value, error, percent) {
  var errorPos = -1;
  var errorNeg = -1;

  if (value) {
    errorPos = (value + error) * (percent ? 100 : 1);
    errorNeg = (value - error) * (percent ? 100 : 1);
    value = (value) * (percent ? 100 : 1);
  } else {
    value = -1;
  }
  return [value, errorNeg, errorPos];
}

function getAreaData(area, indicator) {
  var areaData = $.extend(true, {}, data[area][indicator]);
  var percent = (areaData['data_type'] === 'percent');

  if (areaData) {
    areaData.error = [];
    $.each(areaData.observations, function(i1, observation) {
      areaData.error.push({});
      areaData.error[i1].data = [];
      areaData.error[i1].id = observation.id;
      areaData.error[i1].name = observation.name;
      areaData.error[i1].parent = observation.parent;

      $.each(observation.data, function(i2, data) {

        var newData = transformData(data[1], data[2], percent);
        areaData.error[i1].data[i2] = [newData[1], newData[2]];
        data[1] = newData[0];

        // Cut out error from data
        data.splice(2, 1);
      });

      if (area === 'county') {
        observation.value = observation.data[0][1];
        delete observation.data;
      }

      observation.region = observation.parent;
      observation['hc-key'] = observation.id;
      delete observation.id;
      delete observation.parent;
    });

    return areaData;

  } else {
    return {};
  }
}

function getCountyData(county, indicator) {
  var countyData = getAreaData('county', indicator);

  var data = $.grep(countyData.observations, function (item) {
    return item.name === county;
  });
  return data[0];
}

function getLineData(indicator) {
  var regionData = getAreaData('region', indicator);
  var stateData = getAreaData('state', indicator);
  var lineData = [];

  $.each(regionData.observations, function() {
    this.visible = false;
    lineData.push(this);
  });
  lineData.push(stateData.observations[0]);

  return lineData;
}

function setupCharts() {

  // New way of getting data
  var defaultIndicator = 'asthma';

  var countyData = getAreaData('county', defaultIndicator);
  createMap($('.chart:eq(0)'), countyData.observations, county, countyData.name);

  var lineData = getLineData(defaultIndicator);
  createChart($('.chart:eq(1)'), 'line', lineData, [], y, countyData.name);

  var percent = (countyData['data_type'] === 'percent');
  var label = percent ? 'Percent %' : 'Value';
  $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: label});

  chartWatchers();
}

function parseState(data) {

  var i;
  var lines = data.trim().split('\n');
  var headerSize = 1;

  for (i = 0; i < categories.length; i++) {
    var type = 'line';
    var showInLegend = true;
    var name = '';
    if (i % 2) {
      type = 'errorbar';
      showInLegend = false;
      name = ' - Error Range';
    }

    dataState[categories[i]] = {
      name: 'State' + name,
      type: type,
      data: [],
      showInLegend: showInLegend,
      visible: showInLegend
    };

  }

  $.each(lines, function(lineNo, line) {
    var items = line.split(',');
    var year = parseFloat(items[0]);
    if (lineNo !== 0 && items[0].trim()) {
      for (i = 0; i < categories.length; i++) {
        if (i % 2) {
          var errorNeg = parseFloat(items[i + headerSize - 1]) - parseFloat(items[i + headerSize]);
          var errorPos = parseFloat(items[i + headerSize - 1]) + parseFloat(items[i + headerSize]);
          if ((errorNeg < 1.0 || errorPos < 1.0) && errorNeg > 0 && errorPos > 0) {
            errorNeg *= 100;
            errorPos *= 100;
          }

          //errorNeg *= 1.96;
          //errorPos *= 1.96;

          errorNeg = parseFloat(errorNeg.toFixed(3));
          errorPos = parseFloat(errorPos.toFixed(3));

          dataState[categories[i]].data.push([year, errorNeg,errorPos]);
        } else {
          var value = parseFloat(items[i + headerSize]);
          if (value < 1.0 && value > 0) {
            value *= 100;
          }

          value = parseFloat(value.toFixed(3));

          dataState[categories[i]].data.push([year, value]);
        }
      }
    }
  });

}

function parseRegion(data) {
  var i, j;

  var lines = data.trim().split('\n');

  var numRegions = 5;
  var headerSize = 3;



  for (i = 0; i < numRegions; i++) {
    dataRegion.push({});
    for (j = 0; j < categories.length; j++) {
      var type = 'line';
      var showInLegend = true;
      var name = '';
      if (j % 2) {
        type = 'errorbar';
        showInLegend = false;
        name = ' - Error Range';
      }

      dataRegion[i][categories[j]] = {
        // name: categories[j] + ' - Region ' + (i+1),
        name: 'Region ' + (i+1) + name,
        type: type,
        data: [],
        showInLegend: showInLegend,
        visible: false
      };
    }
  }

  $.each(lines, function(lineNo, line) {
    var items = line.split(',');
    var year = parseFloat(items[2]);
    if (lineNo !== 0 && items[0].trim()) {
      for (i = 0; i < categories.length; i++) {
        if (i % 2) {
          var errorNeg = parseFloat(items[i + headerSize - 1]) - parseFloat(items[i + headerSize]);
          var errorPos = parseFloat(items[i + headerSize - 1]) + parseFloat(items[i + headerSize]);
          if ((errorNeg < 1.0 || errorPos < 1.0) && errorNeg > 0 && errorPos > 0) {
            errorNeg *= 100;
            errorPos *= 100;
          }

          //errorNeg *= 1.96;
          //errorPos *= 1.96;

          errorNeg = parseFloat(errorNeg.toFixed(3));
          errorPos = parseFloat(errorPos.toFixed(3));

          dataRegion[items[0]-1][categories[i]].data.push([year, errorNeg,errorPos]);
        } else {
          var value = parseFloat(items[i + headerSize]);
          if (value < 1.0 && value > 0) {
            value *= 100;
          }

          value = parseFloat(value.toFixed(3));

          dataRegion[items[0]-1][categories[i]].data.push([year, value]);
        }
      }
    }
  });

}


function parseCounty(data) {

  var lines = data.trim().split('\n');

  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i].trim();
  }

  //var lines = document.getElementById('csv').innerHTML.split('\n');
  // Iterate over the lines and add categories or series

  //var categories = lines[0].split(',');
  //numVars = (categories.length - 2) / 2;

  // Add categories
  var headerSize = 2;

  categories = lines[0].split(',');
  categories.splice(0, headerSize);

  for (i = 0; i < categories.length; i++) {
    categories[i] = humanize(categories[i]);
  }

  numVars = categories.length / 2;

  // Get drop down opt from csv

  // Make vars * 2 series (to account for errorbars too)
  for (i = 0; i < categories.length; i++) {
    var type = 'line';

    // If errorbar
    if (i % 2) {
      type = 'errorbar';
    } else {
      //dropDownOptsA.push(categories[i]);
    }

    percent[categories[i]] = false;

    var series = {
      data: [],
      name: categories[i],
      type: type,
      showInLegend: false
    };

    dataCounty.push(series);
  }

  // console.log(JSON.stringify(categories));

  $.each(lines, function(lineNo, line) {
    var items = line.split(',');

    if (lineNo !== 0 && items[0].trim()) {

      for (i = 0; i < categories.length / 2; i ++) {
        var item = items[i*2+headerSize].trim();
        var value = parseFloat(item);
        var error = parseFloat(items[i*2+1+headerSize].trim());
        var name = items[1].trim();

        var errorNeg, errorPos;

        if (value) {
          if (value < 1.0 && value > 0) {
            value *= 100;
            error *= 100;

            percent[categories[i*2]] = true;
            percent[categories[i*2+1]] = true;
          }
          value = parseFloat(value.toFixed(3));

          errorNeg = value - error; // * 1.96;
          errorPos = value + error; // * 1.96;

          errorNeg = parseFloat(errorNeg.toFixed(3));
          errorPos = parseFloat(errorPos.toFixed(3));
        } else {
          value = -1;
          //errorNeg = 'No Data';
          //errorPos = 'No Data';
          errorNeg = -1;
          errorPos = -1;
        }

        dataCounty[i*2].data.push(
          {
            'hc-key': 'us-wi-' + items[0].trim(),
            'name': name,
            'value': value,
            'y': value,
            'region': regionDictionary[name]
          }
        );

        var errorArray = [errorNeg, errorPos];
        dataCounty[i*2 + 1].data.push(errorArray);

      }

    }

  });

  for (i = 2; i < dataCounty.length; i++) {
    dataCounty[i].visible = false;
  }
  /* Done parsing csv */

}

var data = {};

function getData(d1) {
  var a = $.get('data/county.csv');
  var b = $.get('data/region.csv');
  var c = $.get('data/state.csv');
  var d = $.getJSON('data/data.json');

  $.when(a, b, c, d).done(function(aData, bData, cData, dData) {
    parseCounty(aData[0]);
    parseRegion(bData[0]);
    parseState(cData[0]);

    data = dData[0];

    // Set up dropdowns
    $.each(data, function(level) {
      $.each(this, function(name) {
        dropDownIndicators[name] = [this.name, name];
      });
    });

    helperSetup();

    d1.resolve();
  });
}
