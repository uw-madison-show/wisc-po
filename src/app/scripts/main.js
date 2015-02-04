// JSHint options:
/* global $, Highcharts, console, humanize, lineData, templates, createChart, createMap, regionDictionary */
/* exported color2, county, region, country */
'use strict';

/* Global variables */

var i, j;

var color = [
  '#AA3C39',
  '#236467',
  '#AA6D39',
  '#2D8632',
  '#AA8E39'
];

var color2 = [
  'rgba(170, 60, 57, ',
  'rgba(35, 100, 103, ',
  'rgba(170, 109, 57, ',
  'rgba(45, 134, 50, ',
  'rgba(170, 142, 57, '
];

var dropDownOptsA = [
  'Obesity',
  'Flu Vaccines',
  'Asthma',
  'Oral Health Status'
];

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

console.log('\'Allo \'Allo!');


// Init templates
$('#index').html(templates.index);

$('.bootstrapSwitch').bootstrapSwitch();

// Print out a table of data and set it up
// for (i = 0; i < data.length; i++) {
//   // // Make the data random and fun :)
//   // //data[i].value = Math.floor((Math.random() * 1000) + 1);
//   // data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
//   // data[i].y = data[i].value;
//   // data[i].borderColor = color[data[i].region - 1];
//   // data[i].edgeColor = color[data[i].region - 1];
//   // if (!(data[i].value) || data[i].value === 0) {
//   //   //data[i].color = '#444';
//   //   data[i].value = 'No data';
//   // } else {
//   //   //data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';
//   // }
//
//   $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
//       '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
// }


// Serialize each chart with a unique ID
// $('.chart').each(function(i) {
//   $(this).attr('id', 'chart' + i);
// });

// Create main charts based on defined types
// $('.chart:not(".lineChart")').each(function(item) {
//   var type = $('.chartContainer .chartSelect #chartType li.active')[item].getAttribute('data-type');
//   createChart($('.chart:eq(0)'), type);
// });

//createMap($('.chart:eq(0)'), data, county);

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

//createChart($('.chart:eq(1)'), 'line', garbage, x, y);

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
  dropDownOptsA = [];

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
  createChart($('.chart:eq(1)'), 'column', garbage, x, y);

});



// // Make error chart
// var errorSeries = [];
// for (i = 0; i < lineData.length; i++) {
//   var lineError = [];
//   var lineFinal = [];
//   for (j = 0; j < lineData[i].length; j++) {
//     lineFinal[j] = lineData[i][j].value;
//     lineError[j] = [
//       lineData[i][j].value - lineData[i][j]['Margin of Error'],
//       lineData[i][j].value + lineData[i][j]['Margin of Error']
//     ];
//   }
//
//   errorSeries.push({
//     name: 'Hypertension Rate, Region ' + (i+1),
//     type: 'line',
//     data: lineFinal,
//     tooltip: {
//       pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.3f}%</b><br>'
//     },
//     color: color[i]
//   }, {
//     name: 'Measurement error',
//     type: 'errorbar',
//     data: lineError,
//     tooltip: {
//       pointFormat: '(error range: {point.low:.3f} to {point.high:.3f}%)<br/>'
//     },
//     color: color[i],
//     visible: false
//   });
//
// }

// Make the line chart on bottom
// createChart($('.lineChart'), 'line', errorSeries, x, []);
// $('.lineChart').highcharts($.extend(true, {}, errorChartOptions));
