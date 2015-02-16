// JSHint options:
/* global $, createMap, dataCounty, dataRegion, dataState, dataCountry, county, region, country, categories, percent, initCharts */
/* exported chartWatchers */

'use strict';

/* Set up watchers */
$(window).bind('hashchange', function() {
  initCharts();
});

function chartWatchers() {
  $('.chartSelect .dropDownA').change(function() {
    var index = $('option:selected', this).index();
    var type = $('.dropDownC option:selected').val();
    var map = $('.chart:eq(0)').highcharts();
    var chart = $('.chart:eq(1)').highcharts();

    if (type === 'State - County') {
      map.series[0].update({name: categories[index*2]}, false);
      map.setTitle({text: categories[index*2]});
      chart.setTitle({text: categories[index*2]});
      map.series[0].setData(dataCounty[index*2].data);

      chart.yAxis[0].removePlotLine('plot-line-1');
      chart.yAxis[0].removePlotBand('plot-band-1');
      $('#val').text('Selected Value: No region selected');

      //  for (var i = 0; i < 5; i++) {
      //    chart.series[i*2].hide();
      //  }
    }

    for (var i = 0; i < dataRegion.length; i++) {
      chart.series[i*2].setData(dataRegion[i][categories[index*2]].data);
      chart.series[i*2+1].setData(dataRegion[i][categories[index*2+1]].data);
    }

    chart.series[dataRegion.length*2].setData(dataState[categories[index*2]].data);
    chart.series[dataRegion.length*2+1].setData(dataState[categories[index*2+1]].data);

    var max = $('.chart:eq(0)').highcharts().series[0].valueMax;
    var min = $('.chart:eq(0)').highcharts().series[0].valueMin;
    $('.chart:eq(1)').highcharts().yAxis[0].setExtremes(0, max + 0.5 * min);

    if (!percent[categories[index*2]]) {
      $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: 'Value'});
    } else {
      $('.chart:eq(1)').highcharts().yAxis[0].setTitle({text: 'Percent %'});
    }

  });

  $('.chartSelect .dropDownC').change(function() {
    var chart = $('.chart:eq(0)');
    var index = $('.dropDownA option:selected').index();
    chart.highcharts().destroy();

    switch ($(this).val()) {
      case 'State - County':
        createMap($('.chart:eq(0)'), $.extend(true, {}, dataCounty[index*2]).data, county);
        break;
      case 'State - Region':
        createMap(chart, dataRegion, region);
        break;
      case 'Country':
        createMap(chart, dataCountry, country);
        break;
    }
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
