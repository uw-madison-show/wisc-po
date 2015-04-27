// JSHint options:
/* global $, App */
'use strict';

/**
* @namespace App.testing
* @prop enabled {boolean}  If the testing clicker is enabled
* @prop elements {String}  Elements to test in clicking
* @prop counter {number}   Number of tested clicks
*/
App.testing = {
  enabled: false,
  elements: '',
  counter: 0
};

/* Set up selectors for testing */
App.testing.elements += 'input, ';
App.testing.elements += 'select, ';
App.testing.elements += 'button, ';
App.testing.elements += '.highcharts-legend-item, ';
App.testing.elements += '.dataExport, ';
App.testing.elements += '.nav > li a, ';
App.testing.elements += 'path[class*=highcharts-name]';

/**
* Simple random number between 0, and number
* @method random
* @memberof App.testing
* @return {number}
*/
App.testing.random = function(between) {
  return Math.floor(Math.random() * between);
};

/**
* Set up click testing for the site, runs every 0.5 seconds, clicking on an element.
* This is useful to check if things are breaking when a user randomly clicks on
* different elements within the page, the default number of clicks is 1000 (~8.5 minutes)
* @method clicker
* @memberof App.testing
* @return {Void}
*/
App.testing.clicker = function() {
  var element = $(App.testing.elements);
  var rand = App.testing.random(element.length);
  var chosen = element[rand];

  App.misc.setCookie('visitedCharts', 'false', 90);
  App.misc.setCookie('visitedData', 'false', 90);

  console.log('element ' + rand + ', (' + App.testing.counter + '): ' + chosen);

  if (chosen.toString() === '[object HTMLSelectElement]') {
    var options = $(chosen).find('option');
    $(options[App.testing.random(options.length)]).prop('selected', true);
    $(chosen).change();
  } else if (chosen.toString() === '[object HTMLInputElement]') {
    $(chosen).bootstrapSwitch('toggleState');
  } else if (chosen.toString() === '[object SVGPathElement]') {
    $('#chart0').highcharts().series[0].points[App.testing.random(72)].select(true);
  } else if (chosen.toString() === '[object SVGGElement]') {
    $(chosen).click();
  } else {
    chosen.click();
  }

  if (App.testing.counter < 1000) {
    App.testing.counter++;
    setTimeout(App.testing.clicker, 500);
  }
};

/* Set up the testing if enabled */
if (App.testing.enabled) {
  setTimeout(App.testing.clicker, 3000);
}
