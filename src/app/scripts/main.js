// JSHint options:
/* global data, lineData, Highcharts, setTimeout, $, console, templates */
'use strict';

console.log('\'Allo \'Allo!');

$('#index').html(templates.index);

var color = [
  '#AA3C39',
  '#236467',
  '#AA6D39',
  '#2D8632',
  '#AA8E39'
];

var color2 = [
  'rgba(170, 60, 57, ',
  'rgba(35, 100, 103, ',
  'rgba(170, 109, 57, ',
  'rgba(45, 134, 50, ',
  'rgba(170, 142, 57, '
];

var dropDownOptsA = [
  'pre-pop-1',
  'pre-pop-2',
  'pre-pop-3',
  'pre-pop-4',
  'pre-pop-5'
];

var dropDownOptsB = [
  'year'
];

var selectorA = $('.dropDownA');
$.each(dropDownOptsA, function() {
  selectorA.append('<option>' + this + '</option>');
});

var selectorB = $('.dropDownB');
$.each(dropDownOptsB, function() {
  selectorB.append('<option>' + this + '</option>');
});

// Print out a list of this data and set it up

for (var i = 0; i < data.length; i++) {
  // Make the data random and fun :)
  //data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
  data[i].y = data[i].value;
  data[i].borderColor = color[data[i].region - 1];
  data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

  $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
      '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
}


for (var i = 0; i < lineData.length; i++) {
  var lineError = [];
  var lineFinal = [];
  for (var j = 0; j < lineData[i].length; j++) {
    lineFinal[j] = lineData[i][j].value;
    lineError[j] = [
      lineData[i][j].value - lineData[i][j]['Margin of Error'],
      lineData[i][j].value + lineData[i][j]['Margin of Error']
    ];
  }

  errorChartOptions.series.push({
    name: 'Hypertension Rate, Region ' + (i+1),
    // TODO: spline or line???
    type: 'line',
    data: lineFinal,
    tooltip: {
      pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.3f}%</b><br>'
    },
    color: color[i]
  }, {
    name: 'Measurement error',
    type: 'errorbar',
    data: lineError,
    tooltip: {
      pointFormat: '(error range: {point.low:.3f} to {point.high:.3f}%)<br/>'
    },
    color: color[i],
    visible: false
  });

}

// Serialize each chart with a unique ID
$('.chart').each(function(i) {
  $(this).attr('id', 'chart' + i);
});


$('.chart:not(".lineChart")').each(function(item) {
  var type = $(".chartContainer .chartSelect #chartType li.active")[item].getAttribute("data-type");
  createChart($(this), type);
});

//$('.chart:eq(0)').highcharts('Map', $.extend(true, {}, mapChartOptions));
//$('.chart:eq(1)').highcharts($.extend(true, {}, columnChartOptions));


$('.lineChart').highcharts($.extend(true, {}, errorChartOptions));


/* Helper functions */

function randomData() {
  $('#myTable tbody').empty();

  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
    data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ')';

    $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
        '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
  }

  setTimeout(function(){ $('.chart:eq(0)').highcharts().series[0].setData(data); }, 200);
  setTimeout(function(){ $('.chart:eq(1)').highcharts().series[0].setData(data); }, 200);
}

function createChart(chart, type, options) {
  var options = $.extend(true, {}, chartOptions);
  switch (type) {
    case 'line':
      options.chart.type = 'line';
      chart.highcharts(options);
      break;
    case 'spline':
      options.chart.type = 'spline';
      chart.highcharts(options);
      break;
    case 'column':
      options.chart.type = 'column';
      chart.highcharts(options);
      break;
    case 'pie':
      options.chart.type = 'pie';
      chart.highcharts(options);
      break;
    case 'map':
      chart.highcharts('Map', $.extend(true, {}, mapChartOptions));
      break;
  }
}


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
  var chart = $(this).closest('.chartContainer').find('.chart');

  if (type) {
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

/* End watchers */