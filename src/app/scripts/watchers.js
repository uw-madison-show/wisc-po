// JSHint options:
/* global $, App, Handlebars */
'use strict';

/**
* @namespace App.watchers
*/
App.watchers = {};

/* Handle all errors with error screen, and log to google analytics if used */
window.onerror = function() {
  $('#content').html(App.templates.error);
  $('#cookies').hide();

  // Stop testing - always!
  App.testing.counter = 999999;

// window.onerror = function(message, file, line) {
  // if (_gaq) {
    // _gaq.push(['_trackEvent', 'Global', 'Exception', file + '(' + line + '): ' + message]);
  // }

  return false;
};

/* Set up templates */
$(window).bind('hashchange', function() {
  App.tourData.end();
  App.tourCharts.end();
  App.initTemplates();
});

/**
 * Set up watchers for the buttons on the download page.
 * @method downloadWatchers
 * @memberof App.watchers
 * @return {Void}
 */
App.watchers.downloadWatchers = function() {
  $('input[name="county"]').on('switchChange.bootstrapSwitch', function(event, state) {
    $('.dropDownCounty').prop('disabled', !state);
  });

  $('input').on('switchChange.bootstrapSwitch', function() {
    App.download.fillTable();
  });

  $('select').change(function () {
    var indicator = $('.dropDownIndicators option:selected').val();
    App.data.currentMap = App.data.getAreaData('county', indicator);
    App.data.currentLine = App.data.getLineData(indicator);

    App.download.fillTable();
  });

  $('.startTour').click(function() {
    $('#newTour').slideUp(function() {
      App.tourData.start(true);
    });
  });
};

/**
 * Set up watchers for buttons on the chart page.
 * @method chartWatchers
 * @memberof App.watchers
 * @return {Void}
 */
App.watchers.chartWatchers = function() {


  /**
   * Helper function to detroy and recreate both the map and the chart.
   * @method destroyAndRecreate
   * @memberof App.charts.chartWatchers
   * @param {String}      name    Text of the drop down.
   * @param {String}      indicator    Value of the drop down.
   * @return {Void}
   */
  var destroyAndRecreate = function (indicator, name) {
    var map = $('.chart:eq(0)').highcharts();
    var chart = $('.chart:eq(1)').highcharts();

    // TODO: For now, just destroying charts as it seems just as quick and reduces
    //       the amount of edge case errors that we were getting before
    //       there is something odd in the reflow() function in highcharts in the way
    //       it handles null and zero values. maybe?

    // Destroy and make new map
    App.data.currentMap = App.data.getAreaData('county', indicator);
    map.destroy();
    App.charts.createMap($('.chart:eq(0)'), App.data.currentMap.observations, App.maps.county, name);

    // Destroy and make new chart
    App.data.currentLine = App.data.getLineData(indicator);
    chart.destroy();
    App.charts.createChart($('.chart:eq(1)'), 'line', App.data.currentLine, [], App.charts.y, name);

    // Reset reference to chart
    chart = $('.chart:eq(1)').highcharts();

    // Label things by percent or value
    var percent = (App.data.currentLine.data_type === 'percent');
    var label = percent ? 'Percent %' : 'Value';
    chart.yAxis[0].setTitle({text: label});

    $('#description').text('*Description of Indicator: ' + App.data.getDescription(indicator));
  };

  $('.dropDownTags').change(function() {
    var html = Handlebars.helpers.dropDownTagsIndicators().toString();
    $('.dropDownTagsIndicators').html(html);
    $('.dropDownTagsIndicators').change();
  });

  // Watcher and handler for dropDownIndicators selection
  $('.dropDownTagsIndicators').change(function() {
    var indicator = $('option:selected', this).val();
    var name = $('option:selected', this).text();

    $('#val').text('Selected Value: No region selected');
    $('#sampleAlert').slideUp();

    destroyAndRecreate( indicator, name );
  });

  // Watcher and handler for errorbar feature
  $('input[name="errorbar"]').on('switchChange.bootstrapSwitch', function(event, state) {
    // Make animations a bit cleaner (animate chart after switch toggle)

    var chart = $('.chart:eq(1)').highcharts();

    // Hide/Show errorbars based on if active and series visible
    $.each(chart.series, function() {
      if (this.options.type === 'errorbar' && this.linkedParent.visible) {
        if (state) {
          this.show();
        } else {
          this.hide();
        }
      }
    });
  });

  // Watcher and handler for large charts feature
  $('input[name="largecharts"]').on('switchChange.bootstrapSwitch', function() {
    var chart1 = $('.chart:eq(0)');
    var chart2 = $('.chart:eq(1)');
    var indicator = $('.dropDownTagsIndicators option:selected').val();
    var name = $('.dropDownTagsIndicators option:selected').text();

    console.log(indicator + ' || ' + name);

    chart1.parent().toggleClass('col-md-6');
    chart1.parent().toggleClass('largeChart');
    chart1.parent().toggleClass('smallChart');
    
    chart2.parent().toggleClass('col-md-6');
    chart2.parent().toggleClass('largeChart');
    chart2.parent().toggleClass('smallChart');

    // chart1.highcharts().reflow();
    // chart1.highcharts().redraw();
    // chart2.highcharts().reflow();
    // chart2.highcharts().redraw();
    destroyAndRecreate( indicator, name );
  });

  $('.startTour').click(function() {
    $('#newTour').slideUp(function() {
      App.tourCharts.start(true);
    });
  });

  $('#dataExport').click(function(e) {
    var indicator = $('.dropDownTagsIndicators option:selected').val();
    var county = '';
    var error = $('input[name="errorbar"]').bootstrapSwitch('state');

    App.data.currentMap = App.data.getAreaData('county', indicator);
    App.data.currentLine = App.data.getLineData(indicator);

    // Find if a county was selected on the map
    $.each($('#chart0').highcharts().series[0].points, function() {
      if (this.selected) {
        county = this.name;
      }
    });

    App.download.exportedData.enabled = true;
    App.download.exportedData.selectedIndicator = indicator;
    App.download.exportedData.selectedCounty = county;
    App.download.exportedData.enableError = error;

    window.location.hash = 'chart_data';
    e.preventDefault();
  });

};
