// JSHint options:
/* global $, App */

'use strict';

App.watchers = {};

/* Set up templates */
$(window).bind('hashchange', function() {
  App.misc.initTemplates();
});

App.watchers.downloadWatchers = function() {
  $('input[name="county"]').on('switchChange.bootstrapSwitch', function(event, state) {
    $('.dropDownCounty').prop('disabled', !state);
  });

  $('input').on('switchChange.bootstrapSwitch', function() {
    App.download.fillTable();
  });

  $('select').change(function () {
    var indicator = $('.dropDownIndicators option:selected').data('variable');
    App.data.currentMap = App.data.getAreaData('county', indicator);
    App.data.currentLine = App.data.getLineData(indicator);

    App.download.fillTable();
  });
};

App.watchers.chartWatchers = function() {
  $('.dropDownIndicators').change(function() {
    var indicator = $('option:selected', this).data('variable');
    var name = $('option:selected', this).val();
    var map = $('.chart:eq(0)').highcharts();
    var chart = $('.chart:eq(1)').highcharts();

    $('#val').text('Selected Value: No region selected');

    // TODO: For now, just destroying charts as it seems just as quick and reduces
    //       the amount of edge case errors that we were getting before

    // Destroy and make new map
    App.data.currentMap = App.data.getAreaData('county', indicator);
    map.destroy();
    App.charts.createMap($('.chart:eq(0)'), App.data.currentMap.observations, App.maps.county, name);

    // Destroy and make new chart
    App.data.currentLine = App.data.getLineData(indicator);
    chart.destroy();
    App.charts.createChart($('.chart:eq(1)'), 'line', App.data.currentLine, [], App.data.y, name);

    // Reset reference to chart
    chart = $('.chart:eq(1)').highcharts();

    // Label things by percent or value
    var percent = (App.data.currentLine.data_type === 'percent');
    var label = percent ? 'Percent %' : 'Value';
    chart.yAxis[0].setTitle({text: label});
  });

  $('input[name="errorbar"]').on('switchChange.bootstrapSwitch', function(event, state) {
    // Make animations a bit cleaner (animate chart after switch toggle)
    setTimeout(function() {

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

    }, 500);
  });

  $('input[name="largecharts"]').on('switchChange.bootstrapSwitch', function() {
    var chart1 = $('.chart:eq(0)');
    var chart2 = $('.chart:eq(1)');

    chart1.parent().toggleClass('col-md-6');
    chart2.parent().toggleClass('col-md-6');
    chart1.parent().toggleClass('largeChart');
    chart2.parent().toggleClass('largeChart');
    chart1.parent().toggleClass('smallChart');
    chart2.parent().toggleClass('smallChart');

    chart1.highcharts().reflow();
    chart1.highcharts().redraw();
    chart2.highcharts().reflow();
    chart2.highcharts().redraw();
  });

};

/* End watchers */
