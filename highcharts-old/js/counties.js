$(function () {
  
  $.each(Highcharts.maps["countries/us/us-wi-all"].features, function(i, item) {
    console.log("id: " + item.id + ", name: " + item.properties.name);
    $('#myTable tr:last').after('<tr><td>' + i + '</td><td>' + item.properties.name + '</td><td>' + item.id + '</td></tr>');
  });
  
});