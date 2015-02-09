// JSHint options:
/* global $, Highcharts, templates, initCharts */
/* exported color2, county, region, country, dropDownOptsA, dropDownOptsB, dropDownOptsC, x, y, i, j, csv, numVars */
'use strict';

/* Global variables */

var dropDownOptsA = [];

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

var x = { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012'] };
var y = { title: { text: 'Values'}, min: 0, max: 100 };

var csv = [];
var numVars;

/* End global variables */

// Init templates
if (window.location.href.match(/\#.*/)) {
  var page = window.location.href.match(/\#.*/)[0].substring(1);
  if (page === 'charts') {
    $('#content').html(templates.charts);
    initCharts();
  } else if (page) {
    $('#content').html(templates[page]);
  } else {
    $('#content').html(templates.index);
  }

} else {
  $('#content').html(templates.index);
}
