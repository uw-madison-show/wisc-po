// JSHint options:
/* global $, App, downloadWatchers, fillTable, templates */
/* exported createChart, createMap, humanize, initTemplates */
'use strict';

/* Helper functions */

function initTemplates() {
  var d1 = $.Deferred();

  if (!App.data.gotData) {
    App.data.getData(d1);
  } else {
    d1.resolve();
  }

  $.when(d1).done(function() {
    if (window.location.href.match(/\#.*/)) {
      var page = window.location.href.match(/\#.*/)[0].substring(1);
      if (page) {
        $('#content').html(templates[page]);

        // Init toggle switches
        $('.bootstrapSwitch').bootstrapSwitch();

        if (page === 'data') {
          $('#minusIcon').hide();
          fillTable();
          downloadWatchers();
        } else if (page === 'charts') {
          App.charts.setupCharts();
        }
      } else {
        $('#content').html(templates.index);
      }
    } else {
      $('#content').html(templates.index);
    }
  });
}

/* Useful little function found at:
  http://stackoverflow.com/questions/21792367/replace-underscores-with-spaces-and-capitalize-words
*/
function humanize(str) {
  var frags = str.split('_');
  for (var i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
}

/* End helper funtions */
