// JSHint options:
/* global App, Tour */
'use strict';


App.tour = new Tour({
  backdrop: true,
  backdropPadding: 15,
  storage: false,
  steps: [
    {
      element: '.chartSelect',
      title: 'Options Menu',
      content: 'Use the options menu to control the options of the charts and maps',
      placement: 'top'
    },
    {
      element: '#indicatorSelect',
      title: 'Indicator Selection',
      content: 'The indicator selector allows you to change what SHOW Indicator is displayed on the chart and map',
      placement: 'top'
    }
  ]
});
