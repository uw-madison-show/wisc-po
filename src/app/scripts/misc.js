// JSHint options:
/* global $, App */
'use strict';

/**
* @namespace App.misc
*/
App.misc = {};

/**
 * Main function that is called when the page is loaded. This function uses a
 * deferred object (d1) to see if all data has been loaded from {@link App.data.getData}
 * and then continues on to try and initialize the template for the current page
 * (based on # in address).
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
        window.location.hash = '#';
      }
    } else {
      $('#content').html(App.templates.index);
    }
  });
};

/**
 * Useful little function to remove underscores and capatialize words.
 * Found at {@link http://stackoverflow.com/questions/21792367/}
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
