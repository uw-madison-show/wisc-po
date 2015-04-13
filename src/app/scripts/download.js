// JSHint options:
/* global $, App */
'use strict';

/**
* @namespace App.download
*/
App.download = {};

/**
 * Add a row to the table on the download page
 * @method addRow
 * @memberof App.download
 * @param {String} name     Area name for the row
 * @param {number} year     Year of data
 * @param {number} value    Value of data
 * @param {number} errNeg   Transformed negative error
 * @param {number} errPos   Transformed positive error
 * @return {Void}
 */
App.download.addRow = function(name, year, value, errNeg, errPos) {

  if (value === -1) {
    value = 'No Data';
    errNeg = 'No Data';
    errPos = 'No Data';
  }

  var errorEnable = $('input[name="errors"]').bootstrapSwitch('state');
  var error = errorEnable ? '<td>' + errNeg + '</td><td>' + errPos + '</td>' : '';

  $('#myTable').append('<tr><td>' + name + '</td><td>' + year + '</td><td>' + value +
    '</td>' + error);
};

/**
 * Add all valid data to the table for the given indicator
 * @method addArea
 * @memberof App.download
 * @param {String} areaName   Name of the area ('county', 'region', 'state', etc)
 * @param {String} indicator  Name of the indicator (variable name, not description)
 * @return {Void}
 */
App.download.addArea = function(areaName, indicator) {
  var areaData = App.data.getAreaData(areaName, indicator);
  if (areaName === 'county') {
    App.data.currentMap = areaData;
  }

  $.each(areaData.observations, function(i1, area) {
    var name = area.name;
    var year = '';
    var value = '';
    var error = '';

    if (areaName !== 'county') {
      $.each(area.data, function(i2, data) {
        year = data[0];
        value = data[1];
        error = areaData.error[i1].data[i2];

        if (value !== -1) {
          App.download.addRow(name, year, value, error[1], error[2]);
        }
      });

    } else {
      value = App.data.getCurrentCountyData(name).value;
      error = App.data.getCurrentCountyError(name);
      if (value !== -1) {
        App.download.addRow(name, year, value, error[1], error[2]);
      }
    }
  });
};

/**
 * Fill the table with the selected data, called by {@link App.watchers.downloadWatchers}
 * whenever an input changes
 * @method fillTable
 * @memberof App.download
 * @return {Void}
 */
App.download.fillTable = function() {
  var indicator = $('.dropDownIndicators option:selected').data('variable');
  var indicatorName = $('.dropDownIndicators option:selected').text();
  var county = $('.dropDownCounty option:selected').text();
  var countyEnable = $('input[name="county"]').bootstrapSwitch('state');
  var regionEnable = $('input[name="region"]').bootstrapSwitch('state');
  var stateEnable = $('input[name="state"]').bootstrapSwitch('state');
  var errorEnable = $('input[name="errors"]').bootstrapSwitch('state');

  var errors = errorEnable ? '<th>' + 'Confidence (-)</th><th>Confidence(+)</th>' : '';
  // var country = $('input[name="country"]').bootstrapSwitch('state');
  $('#myTable').empty();
  $('#myTable').append('<tr><th>Area</th>' + '<th>Year</th><th>' +
    indicatorName + '</th>' + errors + '</tr>');

  if (countyEnable) {
    if (county === 'All Counties') {
      App.download.addArea('county', indicator);
    } else {
      App.data.currentMap = App.data.getAreaData('county', indicator);
      var value = App.data.getCurrentCountyData(county).value;
      var error = App.data.getCurrentCountyError(county);

      App.download.addRow(county, '', value, error[1], error[2]);
    }
  }

  if (regionEnable) {
    App.download.addArea('region', indicator);
  }

  if (stateEnable) {
    App.download.addArea('state', indicator);
  }

};
