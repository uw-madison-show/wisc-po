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
  $('#myTable tbody').empty();

  for (var i = 0; i < dropDownOptsA.length; i++) {
    $('#myTable thead tr').append('<th>'+ dropDownOptsA[i] + '</th>');
  }

  $('#myTable tbody').append('<tr>');
  var index = 4;
  $('#myTable tbody').append('<td>' + dataCounty[0].data[index].name + '</td>');

  var counties = Object.keys(regionDictionary);
  var countyDropDown = $('.dropDownCounty');
  for (var i = 0; i < regionDictionary.length; i++) {
    countyDropDown.append('<option>' + counties[i] + '</option>');
  }

  $.each(dropDownOptsA, function() {
    selectorA.append('<option>' + this + '</option>');
  });

  for (i = 0; i < dataCounty.length; i+=2) {
    $('#myTable tbody').append('<td>' + dataCounty[i].data[index].value + '</td>');
  }
  $('#myTable tbody').append('</tr>');
  // $('#myTable tbody').append('<tr><td>' + i + '</td><td>' + data[i].name + '</td><td>' + data[i].region +
  //       '</td><td>' + data[i].value + '</td><td>' + data[i]['hc-key'] + '</td></tr>');
}
