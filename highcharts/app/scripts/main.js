console.log('\'Allo \'Allo!');

var average = 0;

var color = [
  "#AA6D39",
  "#236467",
  "#AA3C39",
  "#2D8632",
  "#AA8E39"
];

// Print out a list of this data
/*
$.each(Highcharts.maps["countries/us/us-wi-all"].features, function(i, item) {
  data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].y = data[i].value;
  average += data[i].value;
  data[i].section = Math.floor(i/(data.length/5));
  data[i].borderColor = color[data[i].section];
  data[i].name = item.properties.name;

  $('#myTable tr:last').after('<tr><td>' + i + '</td><td>' + item.properties.name + '</td><td>' + Math.floor(i/(data.length/5))
       + '</td><td>' + data[i].value + '</td><td>' + item.id + '</td></tr>');
});
*/

for (var i = 0; i < data.length; i++) {
  data[i].value = Math.floor((Math.random() * 1000) + 1);
  data[i].y = data[i].value;
  data[i].x = i;
  data[i].name = "abcdefghijklmnop";
}

average = Math.floor(average / data.length);
$('#avg').text(average);


var usemap = false;
var usechart = true;








Highcharts.Series.prototype.hideOverlappingDataLabels = function () {

           var points = this.points,
               len = points.length,
               i,
               j,
               label1,
               label2,
               intersectRect = function (pos1, pos2, size1, size2) {
                   return !(
                       pos2.x > pos1.x + size1.width ||
                       pos2.x + size2.width < pos1.x ||
                       pos2.y > pos1.y + size1.height ||
                       pos2.y + size2.height < pos1.y
                   );
               };

           // Mark with initial opacity
           each(points, function (point, label) {
               label = point.dataLabel;
               if (label) {
                   label.oldOpacity = label.opacity;
                   label.newOpacity = 1;
               }
           });

           // Detect overlapping labels
           for (i = 0; i < len - 1; ++i) {
               label1 = points[i].dataLabel;

               for (j = i + 1; j < len; ++j) {
                   label2 = points[j].dataLabel;
                   if (label1 && label2 && label1.newOpacity !== 0 && label2.newOpacity !== 0 &&
                           intersectRect(label1.alignAttr, label2.alignAttr, label1, label2)) {
                       (points[i].labelrank < points[j].labelrank ? label1 : label2).newOpacity = 0;
                   }
               }
           }

           // Hide or show
           each(points, function (point, label) {
               label = point.dataLabel;
               if (label) {
                   if (label.oldOpacity !== label.newOpacity) {
                       label[label.isOld ? 'animate' : 'attr'](extend({ opacity: label.newOpacity }, label.alignAttr));
                   }
                   label.isOld = true;
               }
           });
       };

       Highcharts.wrap(Highcharts.Series.prototype, 'drawDataLabels', function (proceed) {
           proceed.call(this);
           this.hideOverlappingDataLabels();
       });











// Initiate the map
var map;
if (usemap) {
  map = new Highcharts.Map({

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

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
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
}

var chart;
if (usechart) {
  chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      backgroundColor: null,
      renderTo: 'chart1'
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
        format: '{point.name}',
        crop: true
      },
      shadow: true,
      color: "#fff"
    }]
  });
}


function randomData() {
  console.log("randomness!");
  for (var i = 0; i < data.length; i++) {
    data[i].value = Math.floor((Math.random() * 1000) + 1);
    data[i].y = data[i].value;
  }

  setTimeout(function(){ chart.series[0].setData(data) }, 200);
  map.series[0].setData(data);

}