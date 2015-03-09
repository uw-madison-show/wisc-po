// JSHint options:
/* global $, currentMap, getAreaData, getCurrentCountyData, getCurrentCountyError */
/* exported downloadData, fillTable */
/* jshint -W020 */

'use strict';

function addRow(name, year, value, errNeg, errPos) {
  var errSep = ' - ';

  if (value === -1) {
    value = 'No Data';
    errNeg = 'No Data';
    errSep = '';
    errPos = '';
  }

  var errorEnable = $('input[name="errors"]').bootstrapSwitch('state');
  var error = errorEnable ? '<td>' + errNeg + errSep + errPos + '</td>' : '';

  $('#myTable').append('<tr><td>' + name + '</td><td>' + year + '</td><td>' + value +
    '</td>' + error);
}

// Loop through area and add all to the chart
function addArea(areaName, indicator) {
  var areaData = getAreaData(areaName, indicator);
  if (areaName === 'county') {
    currentMap = areaData;
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

        addRow(name, year, value, error[1], error[2]);
      });
    } else {
      value = getCurrentCountyData(name).value;
      error = getCurrentCountyError(name);
    }
    if (value !== -1) {
      addRow(name, year, value, error[1], error[2]);
    }
  });
}

function fillTable() {
  var indicator = $('.dropDownIndicators option:selected').data('variable');
  var indicatorName = $('.dropDownIndicators option:selected').text();
  var county = $('.dropDownCounty option:selected').text();
  var countyEnable = $('input[name="county"]').bootstrapSwitch('state');
  var regionEnable = $('input[name="region"]').bootstrapSwitch('state');
  var stateEnable = $('input[name="state"]').bootstrapSwitch('state');
  var errorEnable = $('input[name="errors"]').bootstrapSwitch('state');

  var errors = errorEnable ? '<th>' + indicatorName + ' - Error</th>' : '';
  // var country = $('input[name="country"]').bootstrapSwitch('state');
  $('#myTable').empty();
  $('#myTable').append('<tr><th>Name</th>' + '<th>Year</th><th>' +
    indicatorName + '</th>' + errors + '</tr>');

  if (countyEnable) {
    if (county === 'All Counties') {
      addArea('county', indicator);
    } else {
      currentMap = getAreaData('county', indicator);
      var value = getCurrentCountyData(county).value;
      var error = getCurrentCountyError(county);

      addRow(county, '', value, error[1], error[2]);
    }
  }

  if (regionEnable) {
    addArea('region', indicator);
  }

  if (stateEnable) {
    addArea('state', indicator);
  }

}
