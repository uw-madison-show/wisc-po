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
    if (window.location.href.match(/\#.*/)) {
      var page = window.location.href.match(/\#.*/)[0].substring(1);
      if (page !== 'error') {
        if (page === '') {
          page = 'index';
        }

        $('#content').html(App.templates[page]);

        if (page === 'data') {
          // $('#minusIcon').hide();
          $('input[name="county"]').prop('disabled', App.sample);
          App.download.fillTable();
          App.watchers.downloadWatchers();

          if (App.misc.getCookie('visitedData') !== 'true') {
            $('#newTour').show();
            App.misc.setCookie('visitedData', 'true', 90);
          }
        } else if (page === 'charts') {
          App.charts.setupCharts();
          $('#sampleAlert').hide();

          if (App.misc.getCookie('visitedCharts') !== 'true') {
            $('#newTour').show();
            App.misc.setCookie('visitedCharts', 'true', 90);
          }
        }
      } else {
        $('#content').html(App.templates.index);
      }
    } else {
      $('#content').html(App.templates.index);
    }


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
