// JSHint options:
/* global $, createMap, dataCounty, dataRegion, dataState, dataCountry, county, region, country, categories, percent, initTemplates */
/* exported chartWatchers, downloadWatchers */

'use strict';

// TODO: fix JSHint

/* Set up watchers */
$(window).bind('hashchange', function() {
  initTemplates();
});

function downloadWatchers() {
  // $('#collapseOne').on('hide.bs.collapse', function () {
  //   $('#plusIcon').show();
  //   $('#minusIcon').hide();
  // });
  //
  // $('#collapseOne').on('show.bs.collapse', function () {
  //   $('#plusIcon').hide();
  //   $('#minusIcon').show();
  // });

  $('input[name="county"]').on('switchChange.bootstrapSwitch', function(event, state) {
    $('.dropDownCounty').prop('disabled', !state);
  });

  $('input').on('switchChange.bootstrapSwitch', function() {
    fillTable();
  });

  $('select').change(function () {
    fillTable();
  });
}

function chartWatchers() {
  $('.dropDownIndicators').change(function() {
    var indicator = $('option:selected', this).data('variable');
    var name = $('option:selected', this).val();
    var map = $('.chart:eq(0)').highcharts();
    var chart = $('.chart:eq(1)').highcharts();

    $('#val').text('Selected Value: No region selected');

    // TODO: For now, just destroying charts as it seems just as quick and reduces
    //       the amount of edge case errors that we were getting before

    // Destroy and make new map
    currentMap = getAreaData('county', indicator);
    map.destroy();
    createMap($('.chart:eq(0)'), currentMap.observations, county, name);

    // Destroy and make new chart
    currentLine = getLineData(indicator);
    chart.destroy();
    createChart($('.chart:eq(1)'), 'line', currentLine, [], y, name);

  });

  $('input[name="errorbar"]').on('switchChange.bootstrapSwitch', function(event, state) {
    // Make animations a bit cleaner (animate chart after switch toggle)
    setTimeout(function() {

      var chart = $('.chart:eq(1)').highcharts();
      for (var i = 0; i < chart.series.length; i++) {
        if (chart.series[i].type === 'errorbar' && chart.series[i-1].visible) {
          if (state) {
            chart.series[i].show();
          } else {
            chart.series[i].hide();
          }
        }
      }
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

}

/* End watchers */
