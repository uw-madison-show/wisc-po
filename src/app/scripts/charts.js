// JSHint options:
/* global $, garbage, humanize, createChart, createMap, regionDictionary, numVars, dropDownOptsA, dropDownOptsB, dropDownOptsC, county, csv, x, y, chartWatchers */
/* exported initCharts */
'use strict';

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

  // Add other data to csv
  for (var i = 0; i < garbage.length; i++) {
    //csv.push(garbage[i]);
  }

  $('.dropDownA').prop('disabled', false);
  $('.dropDownC').prop('disabled', false);

  createMap($('.chart:eq(0)'), $.extend(true, {}, csv[0]).data, county, csv[0].name);
  // createChart($('.chart:eq(1)'), 'column', garbage, x, y);
  createChart($('.chart:eq(1)'), 'line', garbage, x, y, csv[0].name);

  chartWatchers();
}

function initCharts() {
  // get csv and parse it
  if (csv.length < 1) {
    $.get('data/data.csv', function(data) {

      var lines = data.split('\n');

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

            if (value < 1.0) {
              value *= 100;
              error *= 100;
            }

            var errorNeg = value - parseFloat(error);
            var errorPos = value + parseFloat(error);

            var name = items[1].trim();

            csv[i*2].data.push(
              {
                'hc-key': 'us-wi-' + items[0].trim().substr(2),
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

      setupCharts();
    });
  } else {
    setupCharts();
  }
}
