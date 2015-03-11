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
var App = App || {
  dropDownIndicators: {},
  rounding: 3,
  maps: {},
};

/**
* @namespace App.maps
* @memberof App
* @type {Object}
* @property {Object}  maps.country            References to country map from Highcharts
* @property {Object}  maps.region             References to wi region map from Highcharts
* @property {Object}  maps.county             References to wi county map from Highcharts
* @property {Object}  maps.regionNames        Dictionary of region names
* @property {Object}  maps.regionDictionary   Dictionary of county to region mappings
*/
App.maps = {
  country: Highcharts.maps['countries/us/us-all'],
  region: Highcharts.maps['countries/us/us-wi-region'],
  county: Highcharts.maps['countries/us/us-wi-all'],

  regionNames: [
  'Southeast', 'South', 'West', 'North', 'Northeast'
  ],

  regionDictionary: {
    'Adams': 2,
    'Ashland': 4,
    'Barron': 3,
    'Bayfield': 4,
    'Brown': 5,
    'Buffalo': 3,
    'Burnett': 3,
    'Calumet': 5,
    'Chippewa': 3,
    'Clark': 3,
    'Columbia': 2,
    'Crawford': 2,
    'Dane': 2,
    'Dodge': 2,
    'Door': 5,
    'Douglas': 3,
    'Dunn': 3,
    'Eau Claire': 3,
    'Florence': 4,
    'Fond Du Lac': 5,
    'Forest': 4,
    'Grant': 2,
    'Green': 2,
    'Green Lake': 5,
    'Iowa': 2,
    'Iron': 4,
    'Jackson': 3,
    'Jefferson': 1,
    'Juneau': 2,
    'Kenosha': 1,
    'Kewaunee': 5,
    'La Crosse': 3,
    'Lafayette': 2,
    'Langlade': 4,
    'Lincoln': 4,
    'Manitowoc': 5,
    'Marathon': 4,
    'Marinette': 5,
    'Marquette': 5,
    'Menominee': 5,
    'Milwaukee': 1,
    'Monroe': 3,
    'Oconto': 5,
    'Oneida': 4,
    'Outagamie': 5,
    'Ozaukee': 1,
    'Pepin': 3,
    'Pierce': 3,
    'Polk': 3,
    'Portage': 4,
    'Price': 4,
    'Racine': 1,
    'Richland': 2,
    'Rock': 2,
    'Rusk': 3,
    'Sauk': 2,
    'Sawyer': 4,
    'Shawano': 5,
    'Sheboygan': 5,
    'St. Croix': 3,
    'Taylor': 4,
    'Trempealeau': 3,
    'Vernon': 2,
    'Vilas': 4,
    'Walworth': 1,
    'Washburn': 3,
    'Washington': 1,
    'Waukesha': 1,
    'Waupaca': 5,
    'Waushara': 5,
    'Winnebago': 5,
    'Wood': 4
  }
};
