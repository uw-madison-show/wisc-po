// JSHint options:
/* global $, humanize, createChart, createMap, regionDictionary, dropDownOptsA, dropDownOptsB, dropDownOptsC, county, y, chartWatchers */
/* exported initCharts, getCounty */
'use strict';

var numVars;
var categories = [];
var percent = {};
var dataCounty = [];
var dataRegion = [];
var dataState = [];

/*
var temp = {
  'include_error': true,
  'year': {
    'enabled': false,
    'years': []
  },
  'series': {
    'Count Walk To Mean': {},
    'Count Walk To Error': {},
    'Overweight Mean': {},
    'Overweight Error': {},
    'Asthma Mean': {},
    'Asthma Error': {},
    'Flu Shot Mean': {},
    'Flu Shot Error': {},
    'Poor Oral Health Mean': {},
    'Poor Oral Health Error': {},
    'Hypertension Mean': {},
    'Hypertension Error': {}
  }
};
*/

/* Parse region
for (var x = 0; x < dataRegion.length; x++) {
  var name = 'Region ' + (x+1);
  for (var y = 0; y < categories.length; y++) {
    temp.series[categories[y]][name] = {id: x, name: name, data: dataRegion[x][categories[y]].data};
  }
}
copy(JSON.stringify(temp));
*/

/* Parse State
var name = 'State';
for (var x = 0; x < categories.length; x++) {
  temp.series[categories[x]][name] = {id: 1, name: name, data: dataState[categories[x]].data};
}
copy(JSON.stringify(temp));
*/

/* Parse county
for (var x = 0; x < dataCounty.length; x++) {
  for (var y = 0; y < dataCounty[x].data.length; y++) {
    if (x % 2) {
      var name = dataCounty[x-1].data[y].name;
      var key = dataCounty[x-1].data[y]['hc-key'];
      var value = dataCounty[x].data[y];
      temp.series[categories[x]][name] = {'hc-key': key, name: name, value: value};
      //temp.series[categories[x]][name] = {'hc-key': key, value: value};
    } else {
      var name = dataCounty[x].data[y].name;
      var value = dataCounty[x].data[y].value;
      var key = dataCounty[x].data[y]['hc-key'];
      temp.series[categories[x]][name] = {'hc-key': key, name: name, value: value};
      //temp.series[categories[x]][name] = {'hc-key': key, value: value};
    }
  }
}
copy(JSON.stringify(temp));
*/

function setupCharts() {

  if (window.location.href.match(/\#.*/)) {
    var page = window.location.href.match(/\#.*/)[0].substring(1);
    if (page === 'charts') {

      $('.dropDownA').prop('disabled', false);
      //$('.dropDownC').prop('disabled', false);

      // default measure to be shown (0-indexed)
      var defaultIndex = $('.dropDownA')[0].selectedIndex;

      createMap($('.chart:eq(0)'), dataCounty[defaultIndex*2].data, county, categories[defaultIndex*2]);

      var line = [];
      for (var i = 0; i < dataRegion.length; i++) {
        line.push($.extend(true, {}, dataRegion[i][categories[defaultIndex*2]]));
        line.push($.extend(true, {}, dataRegion[i][categories[defaultIndex*2+1]]));
      }

      line.push($.extend(true, {}, dataState[categories[defaultIndex*2]]));
      line.push($.extend(true, {}, dataState[categories[defaultIndex*2+1]]));

      createChart($('.chart:eq(1)'), 'line', line, [], y, categories[defaultIndex*2]);

      var max = $('.chart:eq(0)').highcharts().series[0].valueMax;
      var min = $('.chart:eq(0)').highcharts().series[0].valueMin;
      $('.chart:eq(1)').highcharts().yAxis[0].setExtremes(0, max + 0.5 * min);

      if (!percent[categories[defaultIndex*2]]) {
        $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: 'Value'});
      } else {
        $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: 'Percent %'});
      }

      chartWatchers();
    }
  }
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
      dropDownOptsA.push(categories[i]);
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

function getData(d1) {
  var a = $.get('data/county.csv');
  var b = $.get('data/region.csv');
  var c = $.get('data/state.csv');

  $.when(a, b, c).done(function(aData, bData, cData) {
    parseCounty(aData[0]);
    parseRegion(bData[0]);
    parseState(cData[0]);

    dropDownSetup();

    d1.resolve();
  });
}
