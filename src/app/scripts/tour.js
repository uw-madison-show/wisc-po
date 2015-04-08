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
      placement: 'top'
    },
    {
      element: '#errorbarToggle',
      title: 'Confidence Interval Toggle',
      content: 'The confidence interval toggle allows you to see the confidence we have for our data based on sample sizes.',
      placement: 'top'
    },
    {
      element: '#largeChartToggle',
      title: 'Large Chart Toggle',
      content: 'The large chart toggle can increase the size of the map and chart on this page.',
      placement: 'top'
    },
    {
      element: '#chart0',
      title: 'Data Map',
      content: 'This map shows data on the individual counties within Wisconsin for the currently selected indicator.',
      placement: 'top'
    },
    {
      element: '#chart1',
      title: 'Data Chart',
      content: 'This chart shows data about the currently selected indicator for different area groupings in Wisconsin (county, region, state).',
      placement: 'top'
    },
    {
      element: '.highcharts-legend',
      title: 'Chart Legend',
      content: 'The chart legend shows which data series are currently shown on the chart. If you click on a series, it will toggle on/off.',
      placement: 'top'
    }
  ]
});

/*
{
  element: '',
  title: '',
  content: '',
  placement: 'top'
},
*/

App.tour.setCurrentStep(4);
