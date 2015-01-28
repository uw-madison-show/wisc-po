// JSHint options:
/* global $, Highcharts, console, data, dataRegion, lineData, templates, createChart, createMap */
/* exported color2, county, region, country */
'use strict';

/* Global variables */

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


// Print out a table of data and set it up
for (var i = 0; i < data.length; i++) {
  // // Make the data random and fun :)
  // //data[i].value = Math.floor((Math.random() * 1000) + 1);
  // data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
  // data[i].y = data[i].value;
  // data[i].borderColor = color[data[i].region - 1];
  // data[i].edgeColor = color[data[i].region - 1];
  // if (!(data[i].value) || data[i].value === 0) {
  //   //data[i].color = '#444';
  //   data[i].value = 'No data';
  // } else {
  //   //data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';
  // }

  $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
      '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
}


// Serialize each chart with a unique ID
$('.chart').each(function(i) {
  $(this).attr('id', 'chart' + i);
});

// Create main charts based on defined types
// $('.chart:not(".lineChart")').each(function(item) {
//   var type = $('.chartContainer .chartSelect #chartType li.active')[item].getAttribute('data-type');
//   createChart($('.chart:eq(0)'), type);
// });

//createMap($('.chart:eq(0)'), data, county);

// Garbage region, state and country data
var garbage = [
  {
    data: [dataRegion[0].value, dataRegion[0].value, dataRegion[0].value, dataRegion[0].value, dataRegion[0].value],
    name: 'Region 1',
    visible: false
  },
  {
    data: [dataRegion[1].value, dataRegion[1].value, dataRegion[1].value, dataRegion[1].value, dataRegion[1].value],
    name: 'Region 2',
    visible: false
  },
  {
    data: [dataRegion[2].value, dataRegion[2].value, dataRegion[2].value, dataRegion[2].value, dataRegion[2].value],
    name: 'Region 3',
    visible: false
  },
  {
    data: [dataRegion[3].value, dataRegion[3].value, dataRegion[3].value, dataRegion[3].value, dataRegion[3].value],
    name: 'Region 4',
    visible: false
  },
  {
    data: [dataRegion[4].value, dataRegion[4].value, dataRegion[4].value, dataRegion[4].value, dataRegion[4].value],
    name: 'Region 5',
    visible: false
  },
  {
    data: [60, 30, 40, 50, 55],
    name: 'State'
  },
  {
    data: [75, 72, 70, 64, 50],
    name: 'Country'
  }
];

var x = { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012'] };
var y = { title: { text: 'Values'}, min: 0, max: 100 };

//createChart($('.chart:eq(1)'), 'line', garbage, x, y);

// custom parsing

var csv = {series: []};

var lines = document.getElementById('csv').innerHTML.split('\n');
// Iterate over the lines and add categories or series
var categories = lines[0].split(',');
var numVars = (categories.length - 2) / 2;

for (var i = 0; i < numVars; i++) {
  var series = {
    data: [],
    name: categories[i*2+2]
  };
  csv.series.push(series);
}

$.each(lines, function(lineNo, line) {
  var items = line.split(',');

  if (lineNo !== 0 && items[0].trim()){

    for (var i = 0; i < numVars; i ++) {
      var item = items[i*2+2].trim();
      var value = parseFloat(item);

      if (value < 1.0) {
        value *= 100;
      }

      csv.series[i].data.push(
        {
          'hc-key': 'us-wi-' + items[0].trim().substr(2),
          'name': items[1].trim(),
          'value': value,
          'y': value
        }
      );
    }

    //options.series.push(series);
  }

});

for (var i = 1; i < numVars; i++) {
  csv.series[i].visible = false;
}

createMap($('.chart:eq(0)'), $.extend(true, {}, csv.series[0]).data, county);
createChart($('.chart:eq(1)'), 'line', csv.series);
//$('.chart:eq(1)').highcharts(options);

// $('.chart:eq(1)').highcharts({
//   chart: {
//     type: 'areaspline'
//   },
//   data: {
//     csv: document.getElementById('csv').innerHTML,
//     // seriesMapping: [{
//     //   name: 1
//     // }],
//     startColumn: 1
//   },
//   xAxis: {
//     labels: {
//       enabled: false
//     }
//   }
// });

// Make error chart
var errorSeries = [];
for (var i = 0; i < lineData.length; i++) {
  var lineError = [];
  var lineFinal = [];
  for (var j = 0; j < lineData[i].length; j++) {
    lineFinal[j] = lineData[i][j].value;
    lineError[j] = [
      lineData[i][j].value - lineData[i][j]['Margin of Error'],
      lineData[i][j].value + lineData[i][j]['Margin of Error']
    ];
  }

  errorSeries.push({
    name: 'Hypertension Rate, Region ' + (i+1),
    type: 'line',
    data: lineFinal,
    tooltip: {
      pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.3f}%</b><br>'
    },
    color: color[i]
  }, {
    name: 'Measurement error',
    type: 'errorbar',
    data: lineError,
    tooltip: {
      pointFormat: '(error range: {point.low:.3f} to {point.high:.3f}%)<br/>'
    },
    color: color[i],
    visible: false
  });

}

// Make the line chart on bottom
createChart($('.lineChart'), 'line', errorSeries, x, []);
// $('.lineChart').highcharts($.extend(true, {}, errorChartOptions));
