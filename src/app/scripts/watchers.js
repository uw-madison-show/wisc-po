// JSHint options:
/* global $, console, createMap, csv, dataRegion, dataCountry, county, region, country, garbage */

'use strict';

/* Set up watchers */
$('#minusIcon').hide();
$('#collapseOne').on('hide.bs.collapse', function () {
  $('#plusIcon').show();
  $('#minusIcon').hide();
});

$('#collapseOne').on('show.bs.collapse', function () {
  $('#plusIcon').hide();
  $('#minusIcon').show();
});

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

    chart.yAxis[0].removePlotLine('plot-band-1');
    for (var i = 0; i < 5; i++) {
      chart.series[i*2].hide();
    }
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

// $('#randomData').on('click', function() { randomData(); } );

$('input[name="numcharts"]').change(function() {
  var chart1 = $('.chart:eq(0)');
  var chart2 = $('.chart:eq(1)');
  if ($(this).val() === '1') {
    chart1.parent().removeClass('col-md-6');
    chart2.parent().hide();
    chart1.highcharts().reflow();
    chart1.highcharts().redraw();
    // chart1.highcharts().series[0].setData(data);

  } else {
    chart1.parent().addClass('col-md-6');
    chart2.parent().show();
    chart1.highcharts().reflow();
    chart1.highcharts().redraw();
    chart2.highcharts().reflow();
    chart2.highcharts().redraw();
  }
});

$('input[name="errorbar"]').on('switchChange.bootstrapSwitch', function(event, state) {
  // Make animations a bit cleaner (animate chart after switch toggle)
  setTimeout(function() {

    var chart = $('.chart:eq(1)').highcharts();
    for (var i = 0; i < garbage.length; i++) {
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

/* End watchers */
