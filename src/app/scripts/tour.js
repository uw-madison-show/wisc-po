// JSHint options:
/* global App, Tour */
'use strict';

/**
* The bootstrap-tour object that is used for the chart tour.
* @memberof App
*/
App.tourCharts = new Tour({
  storage: false,
  steps: [
    {
      orphan: true,
      title: 'Welcome to charts on Wisc Portal!',
      content: 'In the following quick 2 minute walkthrough of our system, we will highlight features and important aspects of charts on the Wisc Portal.'
    },
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
        $('.dropDownIndicators').trigger('change');
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
      content: 'We hope that you enjoy your time using our charts on Wisc Portal'
    },
  ]
});

/**
* The bootstrap-tour object that is used for the data download tour.
* @memberof App
*/
App.tourData = new Tour({
  // backdrop: true,
  // backdropPadding: 15,
  storage: false,
  steps: [
    {
      orphan: true,
      title: 'Welcome to data download on Wisc Portal!',
      content: 'In the following quick 1 minute walkthrough of our system, we will highlight features and important aspects of data download on the Wisc Portal.'
    },
    {
      element: '#topOptions',
      title: 'Top Section of Options',
      content: 'Use the top section of the options menu to toggle individual aspects of your data export to your needs.',
      placement: 'top'
    },
    {
      element: '#toggleCounty',
      title: 'County Data Toggle',
      content: 'Use this toggle to include data on a specific county (or all counties)',
      placement: 'top',
      onShow: function() {
        $('input[name="county"]').bootstrapSwitch('state', true);
      }
    },
    {
      element: '#toggleRegion',
      title: 'Region Data Toggle',
      content: 'Use this toggle to include data on all reigons',
      placement: 'top',
      onShow: function() {
        $('input[name="region"]').bootstrapSwitch('state', true);
      },
      onHide: function() {
        $('input[name="region"]').bootstrapSwitch('state', false);
      }
    },
    {
      element: '#toggleState',
      title: 'State Data Toggle',
      content: 'Use this toggle to include data on the state',
      placement: 'top',
      onShow: function() {
        $('input[name="state"]').bootstrapSwitch('state', true);
      }
    },
    {
      element: '#toggleConfidence',
      title: 'Confidence Intervals Toggle',
      content: 'Use this toggle to include all confidence interval data',
      placement: 'top',
      onShow: function() {
        $('input[name="errors"]').bootstrapSwitch('state', true);
      }
    },
    {
      element: '#bottomOptions',
      title: 'Use the bottom section of the options menu to select precise details for the data to export.',
      content: '',
      placement: 'top'
    },
    {
      element: '#selectCounty',
      title: 'County Selection',
      content: 'This selection dropdown allows for choosing of a specific county, or all counties (if County Data Toggle enabled)',
      placement: 'top',
      onShow: function() {
        $('.dropDownCounty').val('Dane');
        $('.dropDownCounty').trigger('change');
      }
    },
    {
      element: '#selectIndicators',
      title: 'Indicator Selection',
      content: 'This selection dropdown allows for the choosing of the specific indicator to provide data for',
      placement: 'top',
      onShow: function() {
        $('.dropDownIndicators option:eq(2)').prop('selected', true);
        $('.dropDownIndicators').trigger('change');
      }
    },
    {
      element: '#tableTitle',
      title: 'Data Table',
      content: 'The data table gives a quick visual representation of the data that will be provided when you are ready to download. This table is also printer friendly by default if you just want to print it out.',
      placement: 'top'
    },
    {
      element: '#downloadCSV',
      title: 'Download as CSV',
      content: 'This button will produce a CSV file for your data selected (identical to the data table above)',
      placement: 'top'
    },
    {
      element: '#downloadExcel',
      title: 'Download for Excel',
      content: 'This button will produce an excel (xls) file for your data selected (identical to the data table above)',
      placement: 'top'
    },
    {
      orphan: true,
      title: 'You are all set to go!',
      content: 'We hope that you enjoy your time using the data download on Wisc Portal'
    }
  ]
});
