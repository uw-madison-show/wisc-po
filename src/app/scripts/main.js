// JSHint options:
/* global App, Highcharts */
'use strict';

/**
* Main function that is called when the page is loaded. This function uses a
* deferred object (d1) to see if all data has been loaded from {@link App.data.getData}
* and then continues on to try and initialize the template for the current page
* which is based on the # in address.
* @method initTemplates
* @memberof App
* @return {Void}
*/
App.initTemplates = function() {
  var d1 = $.Deferred();

  if (!App.data.gotData) {
    App.data.getData(d1);
  } else {
    d1.resolve();
  }

  $.when(d1).done(function() {
    console.log(window.location.href);


    if (!window.location.href.match(/\#.*/)) {
      // we have no bookmarks, process index page
      $('#content').html(App.templates.index);
      // i now want the index to show the charts
      App.charts.setupCharts();
      $('#sampleAlert').hide();
      if (App.misc.getCookie('visitedCharts') !== 'true') {
        $('#newTour').show();
        App.misc.setCookie('visitedCharts', 'true', 90);
      }
    } else {
      // we have a bookmark, find out what page we want
      var page = window.location.href.match(/\#.*/)[0].substring(1);
      // initialize this page content
      $('#content').html(App.templates[page]);

      // and figure out what js to run
      if ( page === 'error' ) {

        $('#content').html(App.templates.index);

      } else if ( page === 'chart_data') {

        if (App.sample) {
          $('#county, #county1').hide();
        }
        App.download.fillTable();
        App.watchers.downloadWatchers();
        if (App.misc.getCookie('visitedData') !== 'true') {
          $('#newTour').show();
          App.misc.setCookie('visitedData', 'true', 90);
        }

      } else if ( page === 'privacy' ) {

        App.misc.setCookie('acceptCookie', 'true', 90);

      } else if (page === 'contact' ) {

        $('#content').html(App.templates.contact);

      } else {
        // you requested a page that we do not have so here is the default
        $('#content').html(App.templates.index);
      } // end if for which bookmark
    } // end if we are on the index page
      
    // Init toggle switches
    $('.bootstrapSwitch').bootstrapSwitch();

    $('#cookies').on('close.bs.alert', function () {
      App.misc.setCookie('acceptCookie', 'true', 90);
    });

    if (App.misc.getCookie('acceptCookie') === 'true') {
      $('#cookies').hide();
    }
  });
};


// Actual set up and initialization of app
Highcharts.setOptions({lang: {printChart: 'Print'}});
App.initTemplates();
