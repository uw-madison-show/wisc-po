// JSHint options:
/* global $, console, createMap, csv, dataRegion, dataCountry, county, region, country, tempRegion, categories, initCharts */
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
      map.series[0].update({name:csv[index*2].name}, false);
      map.setTitle({text: csv[index*2].name});
      chart.setTitle({text: csv[index*2].name});
      map.series[0].setData(csv[index*2].data);

      chart.yAxis[0].removePlotLine('plot-line-1');
      chart.yAxis[0].removePlotBand('plot-band-1');
      $('#val').text('Selected Value: No region selected');

      //  for (var i = 0; i < 5; i++) {
      //    chart.series[i*2].hide();
      //  }
    }

    for (var i = 0; i < tempRegion.length; i++) {
      chart.series[i*2].setData(tempRegion[i][categories[index*2]].data);
      chart.series[i*2+1].setData(tempRegion[i][categories[index*2+1]].data);
    }

  });

  $('.chartSelect .dropDownC').change(function() {
    console.log('new map - ' + $(this).val());
    var chart = $('.chart:eq(0)');
    var index = $('.dropDownA option:selected').index();
    chart.highcharts().destroy();
    console.log($('.chartSelect .dropDownA').val());

    switch ($(this).val()) {
      case 'State - County':
        createMap($('.chart:eq(0)'), $.extend(true, {}, csv[index*2]).data, county);
        break;
      case 'State - Region':
        createMap(chart, dataRegion, region);
        $('.chart:eq(1)').highcharts().series[0].setData([]);
        break;
      case 'Country':
        createMap(chart, dataCountry, country);
        $('.chart:eq(1)').highcharts().series[0].setData([]);
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
