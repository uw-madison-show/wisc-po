// JSHint options:
/* global $, Highcharts, console, humanize, templates, createChart, createMap, regionDictionary */
/* exported color2, county, region, country */
'use strict';

/* Global variables */

var i, j;

var dropDownOptsB = [
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015'
];

var dropDownOptsC = [
  'State - County',
  'State - Region',
  'Country'
];

var county = Highcharts.maps['countries/us/us-wi-all'];
var region = Highcharts.maps['countries/us/us-wi-region'];
var country = Highcharts.maps['countries/us/us-all'];

/* End global variables */


// Init templates
$('#index').html(templates.index);

// Init toggle switches
$('.bootstrapSwitch').bootstrapSwitch();

// Garbage region, state and country data
var garbage = [
  {
    data: [30,40,80,20,0],
    name: 'Region 1',
    visible: false
  },
  {
    data: [10,20,30,40,50],
    name: 'Region 2',
    visible: false
  },
  {
    data: [90,80,70,30,50],
    name: 'Region 3',
    visible: false
  },
  {
    data: [40,50,40,30,10],
    name: 'Region 4',
    visible: false
  },
  {
    data: [50,70,40,60,50],
    name: 'Region 5',
    visible: false
  },
  {
    data: [60, 30, 40, 50, 55],
    name: 'State',
    visible: true
  },
  {
    data: [75, 72, 70, 64, 50],
    name: 'Country',
    visible: true
  }
];

var meh = [];
for (i = 0; i < garbage.length; i++) {
  var temp = [];
  for (j = 0; j < garbage[i].data.length; j++) {
    var high = Math.random() * 5;
    var low = Math.random() * 5;
    temp.push([garbage[i].data[j] - low, garbage[i].data[j] + high]);
  }

  var title = garbage[i].name + ' Error';
  meh.push(garbage[i]);
  meh.push({name: title, data: temp, type: 'errorbar', visible: false});
}

garbage = meh;

var x = { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012'] };
var y = { title: { text: 'Values'}, min: 0, max: 100 };

// custom parsing

var csv = [];
var numVars;

$.get('data/data.csv', function(data) {

  var lines = data.split('\n');

  //var lines = document.getElementById('csv').innerHTML.split('\n');
  // Iterate over the lines and add categories or series
  var categories = lines[0].split(',');
  numVars = (categories.length - 2) / 2;

  // Get drop down opt from csv
  var dropDownOptsA = [];

  // Make vars * 2 series (to account for errorbars too)
  for (i = 0; i < numVars*2; i++) {
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
  for (i = 0; i < garbage.length; i++) {
    //csv.push(garbage[i]);
  }

  $('.dropDownA').prop('disabled', false);
  $('.dropDownC').prop('disabled', false);

  createMap($('.chart:eq(0)'), $.extend(true, {}, csv[0]).data, county, csv[0].name);
  // createChart($('.chart:eq(1)'), 'column', garbage, x, y);
  createChart($('.chart:eq(1)'), 'line', garbage, x, y, csv[0].name);


});
