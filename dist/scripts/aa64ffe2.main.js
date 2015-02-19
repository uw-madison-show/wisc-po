function createChart(a,b,c,d,e,f){var g=$.extend(!0,{},chartOptions);switch(g.series=c,d&&0!==d.length&&(g.xAxis=d),e&&0!==e.length&&(g.yAxis=e),f&&(g.title.text=f),b){case"line":g.chart.type="line",a.highcharts(g);break;case"spline":g.chart.type="spline",a.highcharts(g);break;case"column":g.chart.type="column",a.highcharts(g);break;case"pie":g.chart.type="pie",a.highcharts(g);break;case"map":g.chart.type="map",g.colorAxis={stops:[[0,"#666666"],[.001,"#f7fcf5"],[.125,"#e5f5e0"],[.25,"#c7e9c0"],[.375,"#a1d99b"],[.5,"#74c476"],[.625,"#41ab5d"],[.75,"#238b45"],[.875,"#006d2c"],[1,"#00441b"]],min:0},g.plotOptions={mapline:{lineWidth:3}},g.tooltip={formatter:function(){var a=this.point.value;-1===this.point.value&&(a="No Data");var b,c=$(".chartSelect .dropDownA option:selected").index(),d=dataCounty[2*c+1].data[this.point.index];return b=-1!==d[0]&&-1!==d[1]?"Error Range: ("+d[0]+" - "+d[1]+")":"","<b>"+this.series.name+"</b><br>Point name: "+this.point.name+"<br>Value: "+a+"<br>"+b}},a.highcharts("Map",g)}}function createMap(a,b,c,d){var e=new Array($.extend(!0,{},mapSeries));e.push({type:"mapline",name:"Borders",color:"red",data:[]}),e[0].data=b,e[0].mapData=c,e[0].name=d,createChart(a,"map",e,[],[],d)}function humanize(a){for(var b=a.split("_"),c=0;c<b.length;c++)b[c]=b[c].charAt(0).toUpperCase()+b[c].slice(1);return b.join(" ")}function setupCharts(){$(".bootstrapSwitch").bootstrapSwitch();var a=$(".dropDownA");$.each(dropDownOptsA,function(){a.append("<option>"+this+"</option>")});var b=$(".dropDownB");$.each(dropDownOptsB,function(){b.append("<option>"+this+"</option>")});var c=$(".dropDownC");$.each(dropDownOptsC,function(){c.append("<option>"+this+"</option>")}),$(".dropDownA").prop("disabled",!1);var d=0;$(".dropDownA").val(categories[2*d]),createMap($(".chart:eq(0)"),dataCounty[2*d].data,county,categories[2*d]);for(var e=[],f=0;f<dataRegion.length;f++)e.push($.extend(!0,{},dataRegion[f][categories[2*d]])),e.push($.extend(!0,{},dataRegion[f][categories[2*d+1]]));e.push($.extend(!0,{},dataState[categories[2*d]])),e.push($.extend(!0,{},dataState[categories[2*d+1]])),createChart($(".chart:eq(1)"),"line",e,[],y,categories[2*d]);var g=$(".chart:eq(0)").highcharts().series[0].valueMax,h=$(".chart:eq(0)").highcharts().series[0].valueMin;$(".chart:eq(1)").highcharts().yAxis[0].setExtremes(0,g+.5*h),$(".chart:eq(1)").highcharts().yAxis[0].setTitle(percent[categories[2*d]]?{text:"Percent %"}:{text:"Value"}),chartWatchers()}function getState(){dataState.length<1?$.get("data/state.csv",function(a){var b,c=a.trim().split("\n"),d=1;for(b=0;b<categories.length;b++){var e="line",f=!0,g="";b%2&&(e="errorbar",f=!1,g=" - Error Range"),dataState[categories[b]]={name:"State"+g,type:e,data:[],showInLegend:f,visible:f}}$.each(c,function(a,c){var e=c.split(","),f=parseFloat(e[0]);if(0!==a&&e[0].trim())for(b=0;b<categories.length;b++)if(b%2){var g=parseFloat(e[b+d-1])-parseFloat(e[b+d]),h=parseFloat(e[b+d-1])+parseFloat(e[b+d]);(1>g||1>h)&&g>0&&h>0&&(g*=100,h*=100),g=parseFloat(g.toFixed(3)),h=parseFloat(h.toFixed(3)),dataState[categories[b]].data.push([f,g,h])}else{var i=parseFloat(e[b+d]);1>i&&i>0&&(i*=100),i=parseFloat(i.toFixed(3)),dataState[categories[b]].data.push([f,i])}}),setupCharts()}):setupCharts()}function getRegion(){dataRegion.length<1?$.get("data/region.csv",function(a){var b,c,d=a.trim().split("\n"),e=5,f=3;for(b=0;e>b;b++)for(dataRegion.push({}),c=0;c<categories.length;c++){var g="line",h=!0,i="";c%2&&(g="errorbar",h=!1,i=" - Error Range"),dataRegion[b][categories[c]]={name:"Region "+(b+1)+i,type:g,data:[],showInLegend:h,visible:!1}}$.each(d,function(a,c){var d=c.split(","),e=parseFloat(d[2]);if(0!==a&&d[0].trim())for(b=0;b<categories.length;b++)if(b%2){var g=parseFloat(d[b+f-1])-parseFloat(d[b+f]),h=parseFloat(d[b+f-1])+parseFloat(d[b+f]);(1>g||1>h)&&g>0&&h>0&&(g*=100,h*=100),g=parseFloat(g.toFixed(3)),h=parseFloat(h.toFixed(3)),dataRegion[d[0]-1][categories[b]].data.push([e,g,h])}else{var i=parseFloat(d[b+f]);1>i&&i>0&&(i*=100),i=parseFloat(i.toFixed(3)),dataRegion[d[0]-1][categories[b]].data.push([e,i])}}),getState()}):getState()}function getCounty(){dataCounty.length<1?$.get("data/county.csv",function(a){for(var b=a.trim().split("\n"),c=0;c<b.length;c++)b[c]=b[c].trim();var d=2;for(categories=b[0].split(","),categories.splice(0,d),c=0;c<categories.length;c++)categories[c]=humanize(categories[c]);for(numVars=categories.length/2,c=0;c<categories.length;c++){var e="line";c%2?e="errorbar":dropDownOptsA.push(categories[c]),percent[categories[c]]=!1;var f={data:[],name:categories[c],type:e,showInLegend:!1};dataCounty.push(f)}for($.each(b,function(a,b){var e=b.split(",");if(0!==a&&e[0].trim())for(c=0;c<categories.length/2;c++){var f,g,h=e[2*c+d].trim(),i=parseFloat(h),j=parseFloat(e[2*c+1+d].trim()),k=e[1].trim();i?(1>i&&i>0&&(i*=100,j*=100,percent[categories[2*c]]=!0,percent[categories[2*c+1]]=!0),i=parseFloat(i.toFixed(3)),f=i-j,g=i+j,f=parseFloat(f.toFixed(3)),g=parseFloat(g.toFixed(3))):(i=-1,f=-1,g=-1),dataCounty[2*c].data.push({"hc-key":"us-wi-"+e[0].trim(),name:k,value:i,y:i,region:regionDictionary[k]});var l=[f,g];dataCounty[2*c+1].data.push(l)}}),c=2;c<dataCounty.length;c++)dataCounty[c].visible=!1;getRegion()}):getRegion()}function initCharts(){if(window.location.href.match(/\#.*/)){var a=window.location.href.match(/\#.*/)[0].substring(1);"charts"===a?($("#content").html(templates.charts),getCounty()):$("#content").html(a?templates[a]:templates.index)}else $("#content").html(templates.index)}function chartWatchers(){$(".chartSelect .dropDownA").change(function(){var a=$("option:selected",this).index(),b=$(".dropDownC option:selected").val(),c=$(".chart:eq(0)").highcharts(),d=$(".chart:eq(1)").highcharts();"State - County"===b&&(c.series[0].update({name:categories[2*a]},!1),c.setTitle({text:categories[2*a]}),d.setTitle({text:categories[2*a]}),c.series[0].setData(dataCounty[2*a].data),d.yAxis[0].removePlotLine("plot-line-1"),d.yAxis[0].removePlotBand("plot-band-1"),$("#val").text("Selected Value: No region selected"));for(var e=0;e<dataRegion.length;e++)d.series[2*e].setData(dataRegion[e][categories[2*a]].data),d.series[2*e+1].setData(dataRegion[e][categories[2*a+1]].data);d.series[2*dataRegion.length].setData(dataState[categories[2*a]].data),d.series[2*dataRegion.length+1].setData(dataState[categories[2*a+1]].data);var f=$(".chart:eq(0)").highcharts().series[0].valueMax,g=$(".chart:eq(0)").highcharts().series[0].valueMin;$(".chart:eq(1)").highcharts().yAxis[0].setExtremes(0,f+.5*g),$(".chart:eq(1)").highcharts().yAxis[0].setTitle(percent[categories[2*a]]?{text:"Percent %"}:{text:"Value"})}),$(".chartSelect .dropDownC").change(function(){var a=$(".chart:eq(0)"),b=$(".dropDownA option:selected").index();switch(a.highcharts().destroy(),$(this).val()){case"State - County":createMap($(".chart:eq(0)"),$.extend(!0,{},dataCounty[2*b]).data,county);break;case"State - Region":createMap(a,dataRegion,region);break;case"Country":createMap(a,dataCountry,country)}}),$('input[name="errorbar"]').on("switchChange.bootstrapSwitch",function(a,b){setTimeout(function(){for(var a=$(".chart:eq(1)").highcharts(),c=0;c<a.series.length;c++)"errorbar"===a.series[c].type&&a.series[c-1].visible&&(b?a.series[c].show():a.series[c].hide())},500)}),$('input[name="largecharts"]').on("switchChange.bootstrapSwitch",function(){var a=$(".chart:eq(0)"),b=$(".chart:eq(1)");a.parent().toggleClass("col-md-6"),b.parent().toggleClass("col-md-6"),a.parent().toggleClass("largeChart"),b.parent().toggleClass("largeChart"),a.parent().toggleClass("smallChart"),b.parent().toggleClass("smallChart"),a.highcharts().reflow(),a.highcharts().redraw(),b.highcharts().reflow(),b.highcharts().redraw()})}Handlebars.registerPartial("dropdown",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<nav role="navigation" class="navbar navbar-default chartSelect">\n\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    <span class="navbar-brand">Options</span>\n  </div>\n\n\n  <div class="clearfix"></div>\n\n  <!-- Collection of nav links and other content for toggling -->\n  <div id="dataCollapse" class="collapse navbar-collapse">\n    <form>\n\n      <div class="form-group nav-select col-sm-3">\n        <label class="control-label">Factor</label>\n        <select disabled class="form-control dropDownA">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-sm-2">\n        <label class="control-label">Year</label>\n        <select disabled class="form-control dropDownB">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-sm-3">\n        <label class="control-label">Map Detail</label>\n        <select disabled class="form-control dropDownC">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0">\n        <label class="control-label">Errorbars</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="errorbar">\n      </div>\n\n      <div class="form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0">\n        <label class="control-label">Large&nbsp;Charts</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="largecharts">\n      </div>\n\n    </form>\n  </div>\n\n\n</nav>\n'},useData:!0})),Handlebars.registerPartial("footer",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="clearfix"></div>\n\n<div class="footer">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>'},useData:!0})),Handlebars.registerPartial("halfChart",Handlebars.template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="clearfix"></div>\n\n    <nav role="navigation" class="navbar navbar-default chartSelect">\n\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class="navbar-header">\n        <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand">Chart '+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'</span>\n      </div>\n\n      <!-- Collection of nav links and other content for toggling -->\n      <div id="dataCollapse" class="collapse navbar-collapse">\n';return e=b["if"].call(a,null!=a?a.type:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='\n        <div class="clearfix"></div>\n\n\n\n',e=b["if"].call(a,null!=a?a.dropdown:a,{name:"if",hash:{},fn:this.program(5,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n      </div>\n    </nav>\n\n"},2:function(a,b,c,d){var e,f='        <ul id="chartType" class="nav navbar-nav navbar-right">\n          <li ';return e=b["if"].call(a,null!=a?a.line:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="line" data-toggle="pill">\n            <a href="#">Line</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.spline:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="spline" data-toggle="pill">\n            <a href="#">Spline</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.column:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="column" data-toggle="pill">\n            <a href="#">Bar</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.pie:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="pie" data-toggle="pill">\n            <a href="#">Pie</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.map:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+' data-type="map" data-toggle="pill">\n            <a href="#">Map</a>\n          </li>\n\n          <!--\n          <li>\n            <a data-toggle="dropdown" href="#">Dropdown <b class="caret"></b></a>\n              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\n                <li><a href="#">Var 1</a></li>\n                <li><a href="#">Var 2</a></li>\n                <li><a href="#">Var 3</a></li>\n                <li><a href="#">Var 4</a></li>\n                <li><a href="#">Var 5</a></li>\n              </ul>\n          </li>\n          -->\n\n        </ul>\n\n'},3:function(){return' class="active" '},5:function(){return'\n        <form class="form-horizontal">\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Location</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownA">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable B</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownB">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable C</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownC">\n              </select>\n            </div>\n          </div>\n\n        </form>\n\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='<div id="chartContainer'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="col-xs-12 col-md-6 chartContainer smallChart">\n  <div id="chart'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="chart col-xs-12"></div>\n\n';return e=b["if"].call(a,null!=a?a.details:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n</div>\n"},useData:!0})),Handlebars.registerPartial("header",Handlebars.template({1:function(){return"active"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<header>\n  <nav role="navigation" class="navbar navbar-default">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <span class="navbar-brand">Wisconsin Portal - ICTR Data Dissemination</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id="navbarCollapse" class="collapse navbar-collapse">\n      <ul class="nav navbar-nav navbar-right">\n        <li class="';return e=b["if"].call(a,null!=a?a.active_home:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#">Home</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_charts:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#charts">Charts</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_data:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#data">Data</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_about:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#about">About</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_contact:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+'"><a href="#contact">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class="jumbotron">\n  <img class="img-responsive" src="images/logo.png" alt="">\n</div>\n'},useData:!0})),Handlebars.registerPartial("linechart",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="chart lineChart col-xs-12"></div>'},useData:!0})),Handlebars.registerPartial("table",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-xs-12">\n\n  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">\n\n    <div class="panel panel-default">\n      <div data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"\n      aria-controls="collapseOne"class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title pull-left">Data Table</h4>\n        <span id="minusIcon" class="glyphicon glyphicon-minus pull-right"></span>\n        <span id="plusIcon" class="glyphicon glyphicon-plus pull-right"></span>\n        <div class="clearfix"></div>\n      </div>\n      <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">\n        <div class="panel-body">\n          <table id="myTable" class="table table-striped table-responsive">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>'},useData:!0})),this.templates=this.templates||{},this.templates.about=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_about:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>About Us</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.charts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_charts:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Data Charts</h1>\n  <hr/>\n\n",e=this.invokePartial(c.dropdown,"  ","dropdown",a,void 0,b,c,d),null!=e&&(f+=e),f+='\n  <h2 id="val">Selected Value: No region selected</h2>\n\n  <div class="row">\n',e=this.invokePartial(c.halfChart,"    ","halfChart",a,{map:!0,num:"0"},b,c,d),null!=e&&(f+=e),e=this.invokePartial(c.halfChart,"    ","halfChart",a,{column:!0,num:"1"},b,c,d),null!=e&&(f+=e),f+="  </div>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.contact=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_contact:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Contact Us</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.data=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_data:!0},b,c,d),null!=e&&(f+=e),f+='\n  <h1>Get Our Data</h1>\n  <hr/>\n\n  <p>The data that we have is availible to the public. Below we have packaged the sample data\n    that is used on this site. If you would like a more specific set of data, you can work\n    with our group to tailor our data to your needs using the self-guided\n    <a href="#contact">data request tool</a> in our contact page.\n  </p>\n\n  <h3>Data Download</h3>\n\n  <p>\n    <a href="data/county.csv" class="btn btn-primary btn-lg" role="button">Download</a>\n  </p>\n\n',e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.index=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_home:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Welcome to SHOW</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0});var regionDictionary={Sauk:2,Iowa:2,Ashland:4,Bayfield:4,Sawyer:4,Columbia:2,Adams:2,Oneida:4,Price:4,Chippewa:3,Clark:3,Outagamie:5,Shawano:5,Lincoln:4,Jefferson:1,Dodge:2,Vilas:4,Forest:4,"Green Lake":5,Waushara:5,Green:2,Rock:2,Walworth:1,Barron:3,Pierce:3,Dunn:3,Rusk:3,Taylor:4,Racine:1,Jackson:3,"Eau Claire":3,Oconto:5,Brown:5,Milwaukee:1,Ozaukee:1,Richland:2,Crawford:2,Waukesha:1,Juneau:2,Vernon:2,Dane:2,Iron:4,Waupaca:5,Winnebago:5,Kewaunee:5,Portage:4,Calumet:5,"La Crosse":3,Marathon:4,Burnett:3,Trempealeau:3,Washburn:3,Pepin:3,Wood:4,Grant:2,Lafayette:2,Sheboygan:5,Marquette:5,Langlade:4,Menominee:5,Washington:1,"St. Croix":3,Florence:4,"Fond du Lac":5,Monroe:3,Buffalo:3,Door:5,Polk:3,Marinette:5,Douglas:3,Kenosha:1,Manitowoc:5},dataCountry=[{"hc-key":"us-ma",name:"Massachusetts",value:0},{"hc-key":"us-wa",name:"Washington",value:1},{"hc-key":"us-ca",name:"California",value:2},{"hc-key":"us-or",name:"Oregon",value:3},{"hc-key":"us-wi",name:"Wisconsin",value:4},{"hc-key":"us-me",name:"Maine",value:5},{"hc-key":"us-mi",name:"Michigan",value:6},{"hc-key":"us-nv",name:"Nevada",value:7},{"hc-key":"us-nm",name:"New Mexico",value:8},{"hc-key":"us-co",name:"Colorado",value:9},{"hc-key":"us-wy",name:"Wyoming",value:10},{"hc-key":"us-ks",name:"Kansas",value:11},{"hc-key":"us-ne",name:"Nebraska",value:12},{"hc-key":"us-ok",name:"Oklahoma",value:13},{"hc-key":"us-mo",name:"Missouri",value:14},{"hc-key":"us-il",name:"Illinois",value:15},{"hc-key":"us-in",name:"Indiana",value:16},{"hc-key":"us-vt",name:"Vermont",value:17},{"hc-key":"us-az",name:"Arizona",value:18},{"hc-key":"us-ar",name:"Arkansas",value:19},{"hc-key":"us-tx",name:"Texas",value:20},{"hc-key":"us-ri",name:"Rhode Island",value:21},{"hc-key":"us-al",name:"Alabama",value:22},{"hc-key":"us-ga",name:"Georgia",value:23},{"hc-key":"us-ms",name:"Mississippi",value:24},{"hc-key":"us-sc",name:"South Carolina",value:25},{"hc-key":"us-nc",name:"North Carolina",value:26},{"hc-key":"us-va",name:"Virginia",value:27},{"hc-key":"us-ia",name:"Iowa",value:28},{"hc-key":"us-md",name:"Maryland",value:29},{"hc-key":"us-de",name:"Delaware",value:30},{"hc-key":"us-nj",name:"New Jersey",value:31},{"hc-key":"us-pa",name:"Pennsylvania",value:32},{"hc-key":"us-ny",name:"New York",value:33},{"hc-key":"us-id",name:"Idaho",value:34},{"hc-key":"us-sd",name:"South Dakota",value:35},{"hc-key":"us-ct",name:"Connecticut",value:36},{"hc-key":"us-nh",name:"New Hampshire",value:37},{"hc-key":"us-ky",name:"Kentucky",value:38},{"hc-key":"us-oh",name:"Ohio",value:39},{"hc-key":"us-tn",name:"Tennessee",value:40},{"hc-key":"us-wv",name:"West Virginia",value:41},{"hc-key":"us-dc",name:"District of Columbia",value:42},{"hc-key":"us-la",name:"Louisiana",value:43},{"hc-key":"us-fl",name:"Florida",value:44},{"hc-key":"us-mn",name:"Minnesota",value:45},{"hc-key":"us-mt",name:"Montana",value:46},{"hc-key":"us-nd",name:"North Dakota",value:47},{"hc-key":"us-ut",name:"Utah",value:48},{"hc-key":"us-hi",name:"Hawaii",value:49},{"hc-key":"us-ak",name:"Alaska",value:50}],chartOptions={chart:{type:"column",backgroundColor:null},title:{text:"Highcharts basic demo"},subtitle:{text:"Source: SHOW Data"},plotOptions:{series:{events:{legendItemClick:function(){if(!this.visible){var a=$('input[name="errorbar"]').bootstrapSwitch("state");return this.show(),!a&&this.linkedSeries&&this.linkedSeries[0].hide(),!1}}}},map:{borderColor:"#f0f0f0"}},tooltip:{crosshairs:!0,shared:!0},series:[{dataLabels:{enabled:!0,formatter:function(){return this.point.x%3!==0?"":this.point.name},verticalAlign:"top"}}],legend:{itemStyle:{fontSize:"14px"}}},mapSeries={mapData:Highcharts.maps["countries/us/us-wi-all"],joinBy:"hc-key",states:{select:{color:"#b700ff"}},dataLabels:{enabled:!1,format:"{point.name}"},allowPointSelect:!0,cursor:"pointer",point:{events:{select:function(){var a=this.value;if(0>a)$("#val").text("Selected Value: "+this.name+" - No Data");else{var b="#005645";$("#val").text("Selected Value: "+this.name+" - "+a);var c=$(".chart:eq(1)").highcharts(),d=$.extend(!0,{},regionMaps[this.region-1]);$(".chart:eq(0)").highcharts().series[1].setData(d.data),c.yAxis[0].removePlotLine("plot-line-1"),c.yAxis[0].removePlotLine("plot-band-1"),c.yAxis[0].addPlotLine({value:a,width:3,color:b,id:"plot-line-1",dashStyle:"longdash",label:{text:this.name+" ("+this.value.toFixed(2)+")",align:"right",style:{fontSize:"11pt"}},zIndex:99});var e=$(".chartSelect .dropDownA option:selected").index(),f=dataCounty[2*e+1].data[this.index];if(c.yAxis[0].addPlotBand({from:f[0],to:f[1],color:"rgba(50, 50, 50, 0.2)",id:"plot-band-1"}),$(".chart:eq(1)").highcharts().yAxis[0].plotLinesAndBands[0].label.toFront(),this.region){for(var g=this.region,h=0;5>h;h++)c.series[2*h].hide();c.series[2*(g-1)].show();var i=$('input[name="errorbar"]').bootstrapSwitch("state"),j=c.series[2*(g-1)];!i&&j.linkedSeries&&j.linkedSeries[0].hide()}}},unselect:function(){if(this.selected){var a=this.region,b=$(".chart:eq(1)").highcharts();b.yAxis[0].removePlotLine("plot-line-1"),b.yAxis[0].removePlotLine("plot-band-1"),$("#val").text("Selected Value: No region selected"),a&&(b.series[2*(a-1)].hide(),$(".chart:eq(0)").highcharts().series[1].setData({}))}}}}},numVars,categories=[],percent={},dataCounty=[],dataRegion=[],dataState=[];$(window).bind("hashchange",function(){initCharts()});var dropDownOptsA=[],dropDownOptsB=["2008","2009","2010","2011","2012","2013","2014","2015"],dropDownOptsC=["State - County","State - Region","Country"],county=Highcharts.maps["countries/us/us-wi-all"],region=Highcharts.maps["countries/us/us-wi-region"],country=Highcharts.maps["countries/us/us-all"],x={title:{text:"Year"},categories:["2008","2009","2010","2011","2012","2013","2014","2015"]},y={title:{text:"Percent %"},min:0};initCharts();