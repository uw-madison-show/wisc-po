// JSHint options:
/* global $, console, createChart, randomData */

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

$('.chartSelect #chartType li').on('click', function() {
  var type = this.getAttribute('data-type');
  var container = $(this).closest('.chartContainer');
  var chart = container.find('.chart');

  if (type) {
    if (type === 'map') {
      container.find('.dropDownC').prop('disabled', true);
    } else {
      container.find('.dropDownC').prop('disabled', false);
    }

    chart.highcharts().destroy();
    createChart(chart, type);
  }
});

$('#randomData').on('click', function() { randomData(); } );

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

$('input[name="errorbar"]').change(function() {
  var lineChart = $('.lineChart').highcharts();
  for(var i = 0; i < lineChart.series.length; i++) {
    if (lineChart.series[i].type === 'errorbar' && lineChart.series[i-1].visible) {
      if ($(this).val() === 'true') {
        lineChart.series[i].show();
      }
      else {
        lineChart.series[i].hide();
      }
    }
  }
});

$('.nav-select select').change(function() {
  console.log('Selected: ' + $('option:selected', this).text());
  randomData();
});


// Watch selected event
/*
Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
  var value = $('.chart:eq(0)').highcharts().series[0].data[this.index].value;
  var color = $('.chart:eq(0)').highcharts().series[0].data[this.index].edgeColor;
  $('#val').text('Value: ' + value);
  $(".chart:eq(1)").highcharts().yAxis[0].removePlotLine('plot-band-1');
  $(".chart:eq(1)").highcharts().yAxis[0].addPlotLine(
    {
      value: value,
      width: 3,
      color: color,
      id: 'plot-band-1',
      dashStyle : 'longdash'
    }
  );
  proceed();
});
*/

/* End watchers */