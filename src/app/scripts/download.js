// JSHint options:
/* global $, dataCounty, dataRegion */
/* exported downloadData, fillTable */
'use strict';

function setupDownload(filename, text) {
  var link = $('#download');
  link[0].setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  link[0].setAttribute('download', filename);
}

function downloadData() {
  setupDownload('data.txt', JSON.stringify(dataRegion, null, '  '));
}

function fillTable() {
  var indexCounty = $('.dropDownCounty')[0].selectedIndex;
  var indexIndicator = $('.dropDownIndicators')[0].selectedIndex;
  var county = $('input[name="county"]').bootstrapSwitch('state');
  var region = $('input[name="region"]').bootstrapSwitch('state');
  var state = $('input[name="state"]').bootstrapSwitch('state');
  // var country = $('input[name="country"]').bootstrapSwitch('state');

  $('#myTable thead tr').empty();
  $('#myTable tbody').empty();

  $('#myTable thead tr').append('<th>Name</th>' + '<th>Year</th>');
  $('#myTable thead tr').append('<th>' + dropDownOptsA[indexIndicator] + '</th>');
  $('#myTable thead tr').append('<th>' + dropDownOptsA[indexIndicator] + ' - Error</th>');

  if (county) {
    $('#myTable tbody').append('<tr>');
    $('#myTable tbody').append('<td>' + dataCounty[0].data[indexCounty].name + '</td>' + '<td></td>');
    var value = dataCounty[indexIndicator*2].data[indexCounty].value;
    var errNeg = dataCounty[indexIndicator*2+1].data[indexCounty][0];
    var separator = ' - ';
    var errPos = dataCounty[indexIndicator*2+1].data[indexCounty][1];

    if (value === -1) {
      value = errNeg = 'No Data';
      separator = errPos = '';
    }

    $('#myTable tbody').append('<td>' + value + '</td><td>' + errNeg + separator + errPos + '</td>');
    $('#myTable tbody').append('</tr>');
  }

  if (region) {
    for (var i = 0; i < dataRegion.length; i++) {
      for (var j = 0; j < dataRegion[i][categories[indexIndicator*2]].data.length; j++) {
        $('#myTable tbody').append('<tr>');
        $('#myTable tbody').append('<td>Region ' + (i+1) + ' </td>');

        var year = dataRegion[i][categories[indexIndicator*2]].data[j][0];
        var value = dataRegion[i][categories[indexIndicator*2]].data[j][1];
        var errNeg = dataRegion[i][categories[indexIndicator*2+1]].data[j][1]
        var separator = ' - ';
        var errPos = dataRegion[i][categories[indexIndicator*2+1]].data[j][2];

        if (value === -1) {
          value = errNeg = 'No Data';
          separator = errPos = '';
        }

        $('#myTable tbody').append('<td>' + year + '</td><td>' + value + '</td><td>' + errNeg + separator + errPos + '</td>');
        $('#myTable tbody').append('</tr>');
      }
    }

  }

  if (state) {
    for (var i = 0; i < dataState[categories[indexIndicator*2]].data.length; i++) {
      $('#myTable tbody').append('<tr>');
      $('#myTable tbody').append('<td>State</td>');

      var year = dataState[categories[indexIndicator*2]].data[i][0];
      var value = dataState[categories[indexIndicator*2]].data[i][1];
      var errNeg = dataState[categories[indexIndicator*2+1]].data[i][1]
      var separator = ' - ';
      var errPos = dataState[categories[indexIndicator*2+1]].data[i][2];

      if (value === -1) {
        value = errNeg = 'No Data';
        separator = errPos = '';
      }

      $('#myTable tbody').append('<td>' + year + '</td><td>' + value + '</td><td>' + errNeg + separator + errPos + '</td>');
      $('#myTable tbody').append('</tr>');
    }
  }
  // $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
  //       '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
}
