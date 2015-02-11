// JSHint options:
/* global $, humanize, createChart, createMap, regionDictionary, dropDownOptsA, dropDownOptsB, dropDownOptsC, templates, county, y, chartWatchers */
/* exported initCharts */
'use strict';

var numVars;
var categories;
var csv = [];
var tempRegion = [];

function setupCharts() {
  // Init toggle switches
  $('.bootstrapSwitch').bootstrapSwitch();

  // Init selectors
  var selectorA = $('.dropDownA');
  $.each(dropDownOptsA, function() {
    selectorA.append('<option>' + this + '</option>');
  });

  var selectorB = $('.dropDownB');
  $.each(dropDownOptsB, function() {
    selectorB.append('<option>' + this + '</option>');
  });

  var selectorC = $('.dropDownC');
  $.each(dropDownOptsC, function() {
    selectorC.append('<option>' + this + '</option>');
  });

  $('.dropDownA').prop('disabled', false);
  $('.dropDownC').prop('disabled', false);

  // default measure to be shown (0-indexed)
  var defaultIndex = 1;

  $('.dropDownA').val(categories[defaultIndex*2]);

  createMap($('.chart:eq(0)'), $.extend(true, {}, csv[defaultIndex*2]).data, county, categories[defaultIndex*2]);
  // createChart($('.chart:eq(1)'), 'column', garbage, x, y);

  var region = [];
  for (var i = 0; i < tempRegion.length; i++) {
    region.push($.extend(true, {}, tempRegion[i][categories[defaultIndex*2]]));
    region.push($.extend(true, {},tempRegion[i][categories[defaultIndex*2+1]]));
  }

  createChart($('.chart:eq(1)'), 'line', region, [], y, categories[defaultIndex*2]);

  chartWatchers();
}

function getRegion() {
  // get csv and parse it
  if (tempRegion.length < 1) {
    $.get('data/region.csv', function(data) {

      var i, j;

      var lines = data.trim().split('\n');

      var numRegions = 5;
      var headerSize = 3;

      // Add categories
      categories = lines[0].trim().split(',');
      categories.splice(0, headerSize);
      for (i = 0; i < categories.length; i++) {
        categories[i] = humanize(categories[i]);
      }

      numVars = (categories.length - headerSize) / 2;

      for (i = 0; i < numRegions; i++) {
        tempRegion.push({});
        for (j = 0; j < categories.length; j++) {
          var type = 'line';
          var showInLegend = true;
          if (j % 2) {
            type = 'errorbar';
            showInLegend = false;
          }

          tempRegion[i][categories[j]] = {
            // name: categories[j] + ' - Region ' + (i+1),
            name: 'Region ' + (i+1),
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
          for (var i = 0; i < categories.length; i++) {
            if (i % 2) {
              var errorNeg = parseFloat(items[i + headerSize - 1]) - parseFloat(items[i + headerSize]) * 1.96;
              var errorPos = parseFloat(items[i + headerSize - 1]) + parseFloat(items[i + headerSize]) * 1.96;
              if (errorNeg < 1.0 || errorPos < 1.0) {
                errorNeg *= 100;
                errorPos *= 100;
              }

              tempRegion[items[0]-1][categories[i]].data.push([year, errorNeg,errorPos]);
            } else {
              var value = parseFloat(items[i + headerSize]);
              if (value < 1.0) {
                value *= 100;
              }

              tempRegion[items[0]-1][categories[i]].data.push([year, value]);
            }
          }
        }
      });


    setupCharts();
    });
  } else {
    setupCharts();
  }
}


function getCounty() {
  // get csv and parse it
  if (csv.length < 1) {
    $.get('data/county.csv', function(data) {

      var lines = data.trim().split('\n');

      //var lines = document.getElementById('csv').innerHTML.split('\n');
      // Iterate over the lines and add categories or series
      var categories = lines[0].split(',');
      numVars = (categories.length - 2) / 2;

      // Get drop down opt from csv

      // Make vars * 2 series (to account for errorbars too)
      for (var i = 0; i < numVars*2; i++) {
        var type = 'line';
        var category = humanize(categories[i+2]);

        // If errorbar
        if (i % 2) {
          type = 'errorbar';
        } else {
          dropDownOptsA.push(category);
        }

        var series = {
          data: [],
          name: category,
          type: type,
          showInLegend: false
        };

        csv.push(series);
      }

      $.each(lines, function(lineNo, line) {
        var items = line.split(',');

        if (lineNo !== 0 && items[0].trim()){

          for (i = 0; i < numVars; i ++) {
            var item = items[i*2+2].trim();
            var value = parseFloat(item);
            var error = items[i*2+3].trim();
            var name = items[1].trim();

            var errorNeg, errorPos;

            if (value) {
              if (value < 1.0) {
                value *= 100;
                error *= 100;
              }

              errorNeg = value - parseFloat(error) * 1.96;
              errorPos = value + parseFloat(error) * 1.96;
            } else {
              value = -1;
              //errorNeg = 'No Data';
              //errorPos = 'No Data';
            }

            csv[i*2].data.push(
              {
                'hc-key': 'us-wi-' + items[0].trim(),
                'name': name,
                'value': value,
                'y': value,
                'region': regionDictionary[name]
              }
            );

            csv[i*2 + 1].data.push(
              [errorNeg, errorPos]
            );
          }

        }

      });

      for (i = 2; i < csv.length; i++) {
        csv[i].visible = false;
      }
      /* Done parsing csv */

      getRegion();
    });
  } else {
    getRegion();
  }
}


function initCharts() {
  if (window.location.href.match(/\#.*/)) {
    var page = window.location.href.match(/\#.*/)[0].substring(1);
    if (page === 'charts') {
      $('#content').html(templates.charts);
      getCounty();
    } else if (page) {
      $('#content').html(templates[page]);
    } else {
      $('#content').html(templates.index);
    }

  } else {
    $('#content').html(templates.index);
  }
}
