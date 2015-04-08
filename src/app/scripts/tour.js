// JSHint options:
/* global App, Tour */
'use strict';

App.tour = new Tour({
  // backdrop: true,
  // backdropPadding: 15,
  storage: false,
  steps: [
    {
      element: '.chartSelect',
      title: 'Options Menu',
      content: 'Use the options menu to control the options of the charts and maps.',
      placement: 'top'
    },
    {
      element: '#indicatorSelect',
      title: 'Indicator Selection',
      content: 'The indicator selector allows you to change what SHOW Indicator is displayed on the chart and map.',
      placement: 'top',
      onShow: function() {
        $('.dropDownIndicators option:first').prop('selected', true);
        $('.dropDownIndicators option:first').trigger("change");
      }
    },
    {
      element: '#errorbarToggle',
      title: 'Confidence Interval Toggle',
      content: 'The confidence interval toggle allows you to see the confidence we have for our data based on sample sizes.',
      placement: 'top',
      onShow: function() {
        $('input[name="errorbar"]').bootstrapSwitch('state', true);
      }
    },
    {
      element: '#largeChartToggle',
      title: 'Large Chart Toggle',
      content: 'The large chart toggle can increase the size of the map and chart on this page.',
      placement: 'top',
      onShow: function() {
        $('input[name="largecharts"]').bootstrapSwitch('state', true);
      },
      onHide: function() {
        $('input[name="largecharts"]').bootstrapSwitch('state', false);
      }
    },
    {
      element: '#highcharts-0',
      title: 'Data Map',
      content: 'This map shows data on the individual counties within Wisconsin for the currently selected indicator.',
      placement: 'top'
    },
    {
      element: '#highcharts-2',
      title: 'Data Chart',
      content: 'This chart shows data about the currently selected indicator for different area groupings in Wisconsin (county, region, state).',
      placement: 'top'
    },
    {
      element: '.highcharts-name-dane',
      title: 'County Map',
      content: 'Clicking on a county will "select" it and highlight it on the data chart to the right.',
      placement: 'top',
      onShow: function() {
        $('#chart0').highcharts().series[0].points[12].select(true);
      },
      onPrev: function() {
        $('#chart0').highcharts().series[0].points[12].select(false);
      }
    },
    {
      element: '#chart1 .highcharts-markers.highcharts-tracker:eq(2)',
      title: 'County Map',
      content: 'Here, you can see the current county on the graph, as well as the confidence levels for the indicator (indicated in grey)',
      placement: 'top',
      onNext: function() {
        $('#chart0').highcharts().series[0].points[12].select(false);
      }
    },
    {
      element: '.highcharts-name-dane',
      title: 'County Map',
      content: 'Clicking on a county again will "unselect" it and remove it from the data chart to the right.',
      placement: 'top'
    },
    {
      element: '#chart1 .highcharts-legend .highcharts-legend-item:eq(3)',
      title: 'Chart Legend',
      content: 'The chart legend shows which data series are currently shown on the chart. If you click on a series, it will toggle on/off.',
      placement: 'top',
      onShow: function() {
        $('#chart1').highcharts().series[6].show();
      }
    },
    {
      element: '#chart0 .highcharts-button',
      title: 'Export Functionality',
      content: 'Pressing the export button will allow you to export or print the given map/chart',
      placement: 'top',
      onShow: function() {
        $('#chart0 .highcharts-button').click();
      },
      onHide: function() {
        $('body').click();
      }
    },
    {
      orphan: true,
      title: 'You are all set to go!',
      content: 'We hope that you enjoy your time on Wisc Portal',
      placement: 'top'
    },
  ]
});

// App.tour.setCurrentStep(5);

/*
{
  element: '',
  title: '',
  content: '',
  placement: 'top'
},
*/
