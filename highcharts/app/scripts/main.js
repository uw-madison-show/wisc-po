console.log('\'Allo \'Allo!');

var average = 0;

var color = [
  "#AA3C39",
  "#236467",
  "#AA6D39",
  "#2D8632",
  "#AA8E39"
];

var color2 = [
  "rgba(170, 60, 57, ",
  "rgba(35, 100, 103, ",
  "rgba(170, 109, 57, ",
  "rgba(45, 134, 50, ",
  "rgba(170, 142, 57, "
];

// Print out a list of this data

$.each(Highcharts.maps["countries/us/us-wi-all"].features, function(i, item) {
  // Make the data random and fun :)
  //data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].value = Math.sin((i / data.length) * 3.1415) * 1000;
  data[i].y = data[i].value;
  data[i].borderColor = color[data[i].region - 1];
  data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ")";
  data[i].name = item.properties.name;

  average += data[i].value;
  $('#myTable tr:last').after('<tr><td>' + i + '</td><td>' + item.properties.name + '</td><td>' + data[i].region
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
  /*
  colorAxis: {
    min: 0,
    max: 1000
  },
  */
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
    }
    //shadow: true,
    //color: '#fff'
  }]
});

$('#line1').highcharts({
  chart: {
    zoomType: 'xy'
  },
  title: {
    text: 'Temperature'
  },
  xAxis: [{
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }],
  yAxis: [{ // Primary yAxis
    labels: {
      formatter: function() {
        return this.value + '°C';
      },
      style: {
        color: '#89A54E'
      }
    },
    title: {
      text: 'Temperature',
      style: {
        color: '#89A54E'
      }
    }
  }],

  tooltip: {
    shared: true
  },

  series: [{
    name: 'Temperature',
    color: '#89A54E',
    type: 'spline',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    tooltip: {
      pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
    }
  }, {
    name: 'Temperature error',
    type: 'errorbar',
    data: [[6, 8], [5.9, 7.6], [9.4, 10.4], [14.1, 15.9], [18.0, 20.1], [21.0, 24.0], [23.2, 25.3], [26.1, 27.8], [23.2, 23.9], [18.0, 21.1], [12.9, 14.0], [7.6, 10.0]],
    tooltip: {
      pointFormat: '(error range: {point.low}-{point.high}°C)<br/>'
    }
  }]
});

function randomData() {
  console.log("randomness!");
  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
    data[i].color = color2[data[i].region - 1] + data[i].value / 1000 + ")";
  }

  setTimeout(function(){ $('#chart1').highcharts().series[0].setData(data) }, 200);
  $('#map1').highcharts().series[0].setData(data);
}