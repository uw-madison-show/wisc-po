// JSHint options:
/* global Highcharts, initTemplates */
/* exported dropDownIndicators, county, region, country, currentCounty, currentRegion, currentState, x, y */
'use strict';

/* Global variables */

var dropDownIndicators = {};

var county = Highcharts.maps['countries/us/us-wi-all'];
var region = Highcharts.maps['countries/us/us-wi-region'];
var country = Highcharts.maps['countries/us/us-all'];

var currentCounty = {};
var currentRegion = {};
var currentState = {};

var x = { title: { text: 'Year'}, categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'] };
var y = { title: { text: 'Percent %'}, min: 0 };

/* End global variables */

// Init templates
initTemplates();
