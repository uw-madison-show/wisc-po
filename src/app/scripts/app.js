// JSHint options:
/* global Highcharts */
/* exported App */
'use strict';

/** Main global app namespace, in which everything is contained
* @namespace App
* @property {Object}  dropDownIndicators  List of indicators that is loaded into the dropdown
* @property {number}  rounding            Precision of rounding that is used globally in the app
*
* @property {Object}  data                Contains everything relating to the json data
* @property {Object}  maps                Contains references to Highcharts maps
*/
var App = {
  dropDownIndicators: {},
  rounding: 3,
  maps: {},
} || App;

/**
* @namespace App.maps
* @memberof App
* @type {Object}
* @property {Object}  maps.country        References to country map from Highcharts
* @property {Object}  maps.region         References to wi region map from Highcharts
* @property {Object}  maps.county         References to wi county map from Highcharts
*/
App.maps = {
  county: Highcharts.maps['countries/us/us-wi-all'],
  region: Highcharts.maps['countries/us/us-wi-region'],
  country: Highcharts.maps['countries/us/us-all'],
};
