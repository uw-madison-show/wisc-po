// JSHint options:
/* global $, App */
'use strict';

/**
* @namespace App.misc
* @prop colors {Object}   An object containing some useful colors to be used with
* {@link App.misc.convertColor}
*/
App.misc = {
  colors: {
    black: { r: 0,   g: 0,   b: 0,   a: 255 },
    white: { r: 255, g: 255, b: 255, a: 255 }
  }
};

/**
 * Main function that is called when the page is loaded. This function uses a
 * deferred object (d1) to see if all data has been loaded from {@link App.data.getData}
 * and then continues on to try and initialize the template for the current page
 * which is based on the # in address.
 * @method initTemplates
 * @memberof App.misc
 * @return {Void}
 */
App.misc.initTemplates = function() {
  var d1 = $.Deferred();

  if (!App.data.gotData) {
    App.data.getData(d1);
  } else {
    d1.resolve();
  }

  $.when(d1).done(function() {
    if (window.location.href.match(/\#.*/)) {
      var page = window.location.href.match(/\#.*/)[0].substring(1);
      if (page && page !== 'error') {
        $('#content').html(App.templates[page]);

        if (page === 'data') {
          // $('#minusIcon').hide();
          $('input[name="county"]').prop('disabled', App.sample);
          App.download.fillTable();
          App.watchers.downloadWatchers();
        } else if (page === 'charts') {
          App.charts.setupCharts();
        }

        // Init toggle switches
        $('.bootstrapSwitch').bootstrapSwitch();
      } else {
        $('#content').html(App.templates.index);
      }
    } else {
      $('#content').html(App.templates.index);
    }
  });
};

/**
 * Useful little function to remove underscores and capatialize words.
 * Found at {@link http://stackoverflow.com/questions/21792367/}. Turns somthing
 * like 'abc_tHIs_IS_cool' into 'Abc This Is Cool'
 * @method humanize
 * @memberof App.misc
 * @param {String} str  The string to convert into a pretty string
 * @return {String}     The human readable version of the string
 */
App.misc.humanize = function(str) {
  var frags = str.split('_');
  for (var i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
};

/**
 * Function to blend a rgba color onto a background rgba color. This produces an
 * rgb color at the end. It is very useful to determine the colors for a heatmap
 * with custom reigons.
 * @method convertColor
 * @example
 * // A sample color
 * var color = {
 *   r: 50,
 *   g: 150,
 *   b: 20,
 *   a: 255
 * };
 * @memberof App.misc
 * @param {Object} Source   An object containing an rgba color
 * @param {Object} BG       An object containing an rgba color
 * @return {Object}         An object containing the blended rgb color.
 */
App.misc.convertColor = function(Source, BG) {
  var finalColor = {};

  // R value
  finalColor.r = ((1 - Source.a) * BG.r) + (Source.a * Source.r);
  // G value
  finalColor.g = ((1 - Source.a) * BG.g) + (Source.a * Source.g);
  // B value
  finalColor.b = ((1 - Source.a) * BG.b) + (Source.a * Source.b);

  return finalColor;
};
