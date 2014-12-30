console.log('\'Allo \'Allo!');

var average = 0;

var color = [
  "#AA3C39",
  "#236467",
  "#AA6D39",
  "#2D8632",
  "#AA8E39"
];

// Print out a list of this data

$.each(Highcharts.maps["countries/us/us-wi-all"].features, function(i, item) {
  // Make the data random and fun :)
  //data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
  data[i].y = data[i].value;
  data[i].section = Math.floor(i/(data.length/5));
  data[i].borderColor = color[data[i].section];
  data[i].name = item.properties.name;

  average += data[i].value;
  $('#myTable tr:last').after('<tr><td>' + i + '</td><td>' + item.properties.name + '</td><td>' + data[i].section
      + '</td><td>' + data[i].value + '</td><td>' + item.id + '</td></tr>');
});

average = Math.floor(average / data.length);
$('#avg').text(average);

// Initiate the map
$('#map1').highcharts('Map', {

  chart: {
    backgroundColor: null,
    renderTo: 'map1'
  },

  title : {
    text : 'Highmaps basic demo'
  },

  subtitle : {
    text : 'Source map: <a href="http://code.highcharts.com/mapdata/countries/us/us-wi-all.js">Wisconsin</a>'
  },

  /*
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },
  */

  chart: {
    backgroundColor: null,
  },

  colorAxis: {
    min: 0,
    max: 1000
  },

  series : [{
    data : data,
    mapData: Highcharts.maps['countries/us/us-wi-all'],
    joinBy: 'hc-key',
    name: 'Random data',
    states: {
      hover: {
        color: '#CB6'
      }
    },
    dataLabels: {
      enabled: false,
      format: '{point.name}'
    },
    borderWidth: 3
  }]
});

$('#chart1').highcharts({
  chart: {
    type: 'column',
    backgroundColor: null
  },
  title: {
    text: 'Highcharts basic demo'
  },
  subtitle: {
    text: 'Source: Random'
  },
  xAxis: {
    title: {
      text: 'Index Number'
    }
  },
  yAxis: {
    min: 0,
    max: 1000,
    title: {
      text: 'Random Data'
    }
  },
  /*
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  */
  series : [{
    data : data,
    dataLabels: {
      enabled: true,
      formatter: function() {
        if (!(this.point.x % 3 === 0)) {
            return '';
        }
        return this.point.name;
      },
      verticalAlign: 'top'
    },
    shadow: true,
    color: '#fff'
  }]
});

function randomData() {
  console.log("randomness!");
  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
  }

  setTimeout(function(){ $('#chart1').highcharts().series[0].setData(data) }, 200);
  $('#map1').highcharts().series[0].setData(data);
}