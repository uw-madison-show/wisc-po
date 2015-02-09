function createChart(a,b,c,d,e,f){var g=$.extend(!0,{},chartOptions);switch(g.series=c,d&&0!==d.length&&(g.xAxis=d),e&&0!==e.length&&(g.yAxis=e),f&&(g.title.text=f),b){case"line":g.chart.type="line",a.highcharts(g);break;case"spline":g.chart.type="spline",a.highcharts(g);break;case"column":g.chart.type="column",a.highcharts(g);break;case"pie":g.chart.type="pie",a.highcharts(g);break;case"map":g.chart.type="map",g.colorAxis={stops:[[0,"#666666"],[.001,"#fbfbfb"],[1,"#005645"]],min:0},g.tooltip={formatter:function(){var a=this.point.value.toFixed(2);-1===this.point.value&&(a="No Data");var b,c=$(".chartSelect .dropDownA option:selected").index(),d=csv[2*c+1].data[this.point.index];return b=d[0]&&d[1]?"Error Range: ("+d[0].toFixed(2)+" - "+d[1].toFixed(2)+")":"","<b>"+this.series.name+"</b><br>Point name: "+this.point.name+"<br>Value: "+a+"<br>"+b}},a.highcharts("Map",g)}}function createMap(a,b,c,d){var e=new Array($.extend(!0,{},mapSeries));e[0].data=b,e[0].mapData=c,e[0].name=d,createChart(a,"map",e,[],[],d)}function humanize(a){for(var b=a.split("_"),c=0;c<b.length;c++)b[c]=b[c].charAt(0).toUpperCase()+b[c].slice(1);return b.join(" ")}function setupCharts(){$(".bootstrapSwitch").bootstrapSwitch();var a=$(".dropDownA");$.each(dropDownOptsA,function(){a.append("<option>"+this+"</option>")});var b=$(".dropDownB");$.each(dropDownOptsB,function(){b.append("<option>"+this+"</option>")});var c=$(".dropDownC");$.each(dropDownOptsC,function(){c.append("<option>"+this+"</option>")});for(var d=0;d<garbage.length;d++);$(".dropDownA").prop("disabled",!1),$(".dropDownC").prop("disabled",!1),createMap($(".chart:eq(0)"),$.extend(!0,{},csv[0]).data,county,csv[0].name),createChart($(".chart:eq(1)"),"line",garbage,x,y,csv[0].name),chartWatchers()}function initCharts(){csv.length<1?$.get("data/county.csv",function(a){var b=a.split("\n"),c=b[0].split(",");numVars=(c.length-2)/2;for(var d=0;2*numVars>d;d++){var e="line",f=humanize(c[d+2]);d%2?e="errorbar":dropDownOptsA.push(f);var g={data:[],name:f,type:e,showInLegend:!1};csv.push(g)}for($.each(b,function(a,b){var c=b.split(",");if(0!==a&&c[0].trim())for(d=0;numVars>d;d++){var e,f,g=c[2*d+2].trim(),h=parseFloat(g),i=c[2*d+3].trim(),j=c[1].trim();h?(1>h&&(h*=100,i*=100),e=h-1.96*parseFloat(i),f=h+1.96*parseFloat(i)):h=-1,csv[2*d].data.push({"hc-key":"us-wi-"+c[0].trim(),name:j,value:h,y:h,region:regionDictionary[j]}),csv[2*d+1].data.push([e,f])}}),d=2;d<csv.length;d++)csv[d].visible=!1;setupCharts()}):setupCharts()}function chartWatchers(){$(".chartSelect .dropDownA").change(function(){var a=$("option:selected",this).index(),b=$(".dropDownC option:selected").val(),c=$(".chart:eq(0)").highcharts(),d=$(".chart:eq(1)").highcharts();if("State - County"===b){c.series[0].update({name:csv[2*a].name},!1),c.setTitle({text:csv[2*a].name}),d.setTitle({text:csv[2*a].name}),c.series[0].setData(csv[2*a].data),d.yAxis[0].removePlotLine("plot-band-1");for(var e=0;5>e;e++)d.series[2*e].hide()}}),$(".chartSelect .dropDownC").change(function(){console.log("new map - "+$(this).val());var a=$(".chart:eq(0)"),b=$(".dropDownA option:selected").index();switch(a.highcharts().destroy(),console.log($(".chartSelect .dropDownA").val()),$(this).val()){case"State - County":createMap($(".chart:eq(0)"),$.extend(!0,{},csv[2*b]).data,county);break;case"State - Region":createMap(a,dataRegion,region),$(".chart:eq(1)").highcharts().series[0].setData([]);break;case"Country":createMap(a,dataCountry,country),$(".chart:eq(1)").highcharts().series[0].setData([])}}),$('input[name="numcharts"]').change(function(){var a=$(".chart:eq(0)"),b=$(".chart:eq(1)");"1"===$(this).val()?(a.parent().removeClass("col-md-6"),b.parent().hide(),a.highcharts().reflow(),a.highcharts().redraw()):(a.parent().addClass("col-md-6"),b.parent().show(),a.highcharts().reflow(),a.highcharts().redraw(),b.highcharts().reflow(),b.highcharts().redraw())}),$('input[name="errorbar"]').on("switchChange.bootstrapSwitch",function(a,b){setTimeout(function(){for(var a=$(".chart:eq(1)").highcharts(),c=0;c<garbage.length;c++)"errorbar"===a.series[c].type&&a.series[c-1].visible&&(b?a.series[c].show():a.series[c].hide())},500)}),$('input[name="largecharts"]').on("switchChange.bootstrapSwitch",function(){var a=$(".chart:eq(0)"),b=$(".chart:eq(1)");a.parent().toggleClass("col-md-6"),b.parent().toggleClass("col-md-6"),a.parent().toggleClass("largeChart"),b.parent().toggleClass("largeChart"),a.parent().toggleClass("smallChart"),b.parent().toggleClass("smallChart"),a.highcharts().reflow(),a.highcharts().redraw(),b.highcharts().reflow(),b.highcharts().redraw()})}Handlebars.registerPartial("dropdown",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<nav role="navigation" class="navbar navbar-default chartSelect">\n\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    <span class="navbar-brand">Options</span>\n  </div>\n\n\n  <div class="clearfix"></div>\n\n  <!-- Collection of nav links and other content for toggling -->\n  <div id="dataCollapse" class="collapse navbar-collapse">\n    <form>\n\n      <div class="form-group nav-select col-sm-3">\n        <label class="control-label">Factor</label>\n        <select disabled class="form-control dropDownA">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-sm-2">\n        <label class="control-label">Year</label>\n        <select disabled class="form-control dropDownB">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-sm-3">\n        <label class="control-label">Map Detail</label>\n        <select disabled class="form-control dropDownC">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0">\n        <label class="control-label">Errorbars</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="errorbar">\n      </div>\n\n      <div class="form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0">\n        <label class="control-label">Large&nbsp;Charts</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="largecharts">\n      </div>\n\n    </form>\n  </div>\n\n\n</nav>\n'},useData:!0})),Handlebars.registerPartial("footer",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="clearfix"></div>\n\n<div class="footer">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>'},useData:!0})),Handlebars.registerPartial("halfChart",Handlebars.template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="clearfix"></div>\n\n    <nav role="navigation" class="navbar navbar-default chartSelect">\n\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class="navbar-header">\n        <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand">Chart '+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'</span>\n      </div>\n\n      <!-- Collection of nav links and other content for toggling -->\n      <div id="dataCollapse" class="collapse navbar-collapse">\n';return e=b["if"].call(a,null!=a?a.type:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='\n        <div class="clearfix"></div>\n\n\n\n',e=b["if"].call(a,null!=a?a.dropdown:a,{name:"if",hash:{},fn:this.program(5,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n      </div>\n    </nav>\n\n"},2:function(a,b,c,d){var e,f='        <ul id="chartType" class="nav navbar-nav navbar-right">\n          <li ';return e=b["if"].call(a,null!=a?a.line:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="line" data-toggle="pill">\n            <a href="#">Line</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.spline:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="spline" data-toggle="pill">\n            <a href="#">Spline</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.column:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="column" data-toggle="pill">\n            <a href="#">Bar</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.pie:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="pie" data-toggle="pill">\n            <a href="#">Pie</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.map:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+' data-type="map" data-toggle="pill">\n            <a href="#">Map</a>\n          </li>\n\n          <!--\n          <li>\n            <a data-toggle="dropdown" href="#">Dropdown <b class="caret"></b></a>\n              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\n                <li><a href="#">Var 1</a></li>\n                <li><a href="#">Var 2</a></li>\n                <li><a href="#">Var 3</a></li>\n                <li><a href="#">Var 4</a></li>\n                <li><a href="#">Var 5</a></li>\n              </ul>\n          </li>\n          -->\n\n        </ul>\n\n'},3:function(){return' class="active" '},5:function(){return'\n        <form class="form-horizontal">\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Location</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownA">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable B</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownB">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable C</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownC">\n              </select>\n            </div>\n          </div>\n\n        </form>\n\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='<div id="chartContainer'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="col-xs-12 col-md-6 chartContainer smallChart">\n  <div id="chart'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="chart col-xs-12"></div>\n\n';return e=b["if"].call(a,null!=a?a.details:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n</div>\n"},useData:!0})),Handlebars.registerPartial("header",Handlebars.template({1:function(){return"active"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<header>\n  <nav role="navigation" class="navbar navbar-default">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <span class="navbar-brand">Wisconsin Portal - ICTR Data Dissemination</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id="navbarCollapse" class="collapse navbar-collapse">\n      <ul class="nav navbar-nav navbar-right">\n        <li class="';return e=b["if"].call(a,null!=a?a.active_home:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#">Home</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_charts:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#charts">Charts</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_data:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#data">Data</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_about:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#about">About</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_contact:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+'"><a href="#contact">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class="jumbotron">\n  <img class="img-responsive" src="images/logo.png" alt="">\n</div>\n'},useData:!0})),Handlebars.registerPartial("linechart",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="chart lineChart col-xs-12"></div>'},useData:!0})),Handlebars.registerPartial("table",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-xs-12">\n\n  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">\n\n    <div class="panel panel-default">\n      <div data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"\n      aria-controls="collapseOne"class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title pull-left">Data Table</h4>\n        <span id="minusIcon" class="glyphicon glyphicon-minus pull-right"></span>\n        <span id="plusIcon" class="glyphicon glyphicon-plus pull-right"></span>\n        <div class="clearfix"></div>\n      </div>\n      <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">\n        <div class="panel-body">\n          <table id="myTable" class="table table-striped table-responsive">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>'},useData:!0})),this.templates=this.templates||{},this.templates.about=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_about:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>About Us</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.charts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_charts:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Data Charts</h1>\n  <hr/>\n\n",e=this.invokePartial(c.dropdown,"  ","dropdown",a,void 0,b,c,d),null!=e&&(f+=e),f+='\n  <h2 id="val">Selected Value: No region selected</h2>\n\n  <div class="row">\n',e=this.invokePartial(c.halfChart,"    ","halfChart",a,{map:!0,num:"0"},b,c,d),null!=e&&(f+=e),e=this.invokePartial(c.halfChart,"    ","halfChart",a,{column:!0,num:"1"},b,c,d),null!=e&&(f+=e),f+="  </div>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.contact=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_contact:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Contact Us</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.data=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_data:!0},b,c,d),null!=e&&(f+=e),f+='\n  <h1>Get Our Data</h1>\n  <hr/>\n\n  <p>The data that we have is availible to the public. Below we have packaged the sample data\n    that is used on this site. If you would like a more specific set of data, you can work\n    with our group to tailor our data to your needs using the self-guided\n    <a href="#contact">data request tool</a> in our contact page.\n  </p>\n\n  <h3>Data Download</h3>\n\n  <p>\n    <a href="data/county.csv" class="btn btn-primary btn-lg" role="button">Download</a>\n  </p>\n\n',e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.templates.index=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_home:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Welcome to SHOW</h1>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0});var garbage=[{data:[30,40,80,20,0],name:"Region 1",visible:!1,_colorIndex:0,_symbolIndex:0},{name:"Region 1 Error",data:[[26.552194418618456,34.27807675441727],[35.5119459645357,40.00523746362887],[77.2784998815041,83.48514350363985],[19.446787275373936,24.267097195843235],[-4.8523786722216755,.5033664219081402]],type:"errorbar",visible:!1},{data:[10,20,30,40,50],name:"Region 2",visible:!1,_colorIndex:1,_symbolIndex:1},{name:"Region 2 Error",data:[[6.39028369798325,13.391455309465528],[16.445126238977537,23.741745294537395],[29.57130510127172,34.796150882029906],[38.87180492281914,44.327019724296406],[48.45504522207193,51.88944304245524]],type:"errorbar",visible:!1},{data:[90,80,70,30,50],name:"Region 3",visible:!1,_colorIndex:2,_symbolIndex:2},{name:"Region 3 Error",data:[[88.5130394785665,91.01143028354272],[75.6683817517478,83.95366478711367],[65.84965593763627,74.63274455047213],[26.774855798576027,31.44193877466023],[48.79155076108873,53.90742286806926]],type:"errorbar",visible:!1},{data:[40,50,40,30,10],name:"Region 4",visible:!1,_colorIndex:3,_symbolIndex:3},{name:"Region 4 Error",data:[[36.64937285822816,43.88398942304775],[46.651853495277464,52.408086601644754],[38.73383634723723,41.60794218652882],[29.40999201964587,33.18971052067354],[7.741138974670321,13.236417466541752]],type:"errorbar",visible:!1},{data:[50,70,40,60,50],name:"Region 5",visible:!1,_colorIndex:4,_symbolIndex:4},{name:"Region 5 Error",data:[[48.99160056957044,52.68250454450026],[66.59493681625463,71.7766970617231],[39.426092584617436,42.61673888657242],[59.32327919523232,62.83144695451483],[48.760333319660276,50.79653343418613]],type:"errorbar",visible:!1},{data:[60,30,40,50,55],name:"State",visible:!0,_colorIndex:5,_symbolIndex:0},{name:"State Error",data:[[55.79297718824819,60.64025986008346],[29.60797902313061,32.399350717896596],[36.13362151198089,43.38928934070282],[48.7548151856754,51.19164619478397],[52.87300078663975,59.79075173265301]],type:"errorbar",visible:!1},{data:[75,72,70,64,50],name:"Country",visible:!0,_colorIndex:6,_symbolIndex:1},{name:"Country Error",data:[[74.11770019913092,76.10819792258553],[70.18076680647209,74.51010738196783],[67.54769559134729,71.39169643167406],[62.62440677708946,68.26992271910422],[49.365348406136036,52.87911617197096]],type:"errorbar",visible:!1}],regionDictionary={Sauk:2,Iowa:2,Ashland:4,Bayfield:4,Sawyer:4,Columbia:2,Adams:2,Oneida:4,Price:4,Chippewa:3,Clark:3,Outagamie:5,Shawano:5,Lincoln:4,Jefferson:1,Dodge:2,Vilas:4,Forest:4,"Green Lake":5,Waushara:5,Green:2,Rock:2,Walworth:1,Barron:3,Pierce:3,Dunn:3,Rusk:3,Taylor:4,Racine:1,Jackson:3,"Eau Claire":3,Oconto:5,Brown:5,Milwaukee:1,Ozaukee:1,Richland:2,Crawford:2,Waukesha:1,Juneau:2,Vernon:2,Dane:2,Iron:4,Waupaca:5,Winnebago:5,Kewaunee:5,Portage:4,Calumet:5,"La Crosse":3,Marathon:4,Burnett:3,Trempealeau:3,Washburn:3,Pepin:3,Wood:4,Grant:2,Lafayette:2,Sheboygan:5,Marquette:5,Langlade:4,Menominee:5,Washington:1,"St. Croix":3,Florence:4,"Fond du Lac":5,Monroe:3,Buffalo:3,Door:5,Polk:3,Marinette:5,Douglas:3,Kenosha:1,Manitowoc:5},data=[{name:"Sauk","hc-key":"us-wi-111",region:2,value:-1},{name:"Iowa","hc-key":"us-wi-049",region:2,value:1},{name:"Ashland","hc-key":"us-wi-003",region:4,value:2},{name:"Bayfield","hc-key":"us-wi-007",region:4,value:3},{name:"Sawyer","hc-key":"us-wi-113",region:4,value:4},{name:"Columbia","hc-key":"us-wi-021",region:2,value:5},{name:"Adams","hc-key":"us-wi-001",region:2,value:6},{name:"Oneida","hc-key":"us-wi-085",region:4,value:7},{name:"Price","hc-key":"us-wi-099",region:4,value:8},{name:"Chippewa","hc-key":"us-wi-017",region:3,value:9},{name:"Clark","hc-key":"us-wi-019",region:3,value:10},{name:"Outagamie","hc-key":"us-wi-087",region:5,value:11},{name:"Shawano","hc-key":"us-wi-115",region:5,value:12},{name:"Lincoln","hc-key":"us-wi-069",region:4,value:13},{name:"Jefferson","hc-key":"us-wi-055",region:1,value:14},{name:"Dodge","hc-key":"us-wi-027",region:2,value:15},{name:"Vilas","hc-key":"us-wi-125",region:4,value:16},{name:"Forest","hc-key":"us-wi-041",region:4,value:17},{name:"Green Lake","hc-key":"us-wi-047",region:5,value:18},{name:"Waushara","hc-key":"us-wi-137",region:5,value:19},{name:"Green","hc-key":"us-wi-045",region:2,value:20},{name:"Rock","hc-key":"us-wi-105",region:2,value:21},{name:"Walworth","hc-key":"us-wi-127",region:1,value:22},{name:"Barron","hc-key":"us-wi-005",region:3,value:23},{name:"Pierce","hc-key":"us-wi-093",region:3,value:24},{name:"Dunn","hc-key":"us-wi-033",region:3,value:25},{name:"Rusk","hc-key":"us-wi-107",region:3,value:26},{name:"Taylor","hc-key":"us-wi-119",region:4,value:27},{name:"Racine","hc-key":"us-wi-101",region:1,value:28},{name:"Jackson","hc-key":"us-wi-053",region:3,value:29},{name:"Eau Claire","hc-key":"us-wi-035",region:3,value:30},{name:"Oconto","hc-key":"us-wi-083",region:5,value:31},{name:"Brown","hc-key":"us-wi-009",region:5,value:32},{name:"Milwaukee","hc-key":"us-wi-079",region:1,value:33},{name:"Ozaukee","hc-key":"us-wi-089",region:1,value:34},{name:"Richland","hc-key":"us-wi-103",region:2,value:35},{name:"Crawford","hc-key":"us-wi-023",region:2,value:36},{name:"Waukesha","hc-key":"us-wi-133",region:1,value:37},{name:"Juneau","hc-key":"us-wi-057",region:2,value:38},{name:"Vernon","hc-key":"us-wi-123",region:2,value:39},{name:"Dane","hc-key":"us-wi-025",region:2,value:40},{name:"Iron","hc-key":"us-wi-051",region:4,value:41},{name:"Waupaca","hc-key":"us-wi-135",region:5,value:42},{name:"Winnebago","hc-key":"us-wi-139",region:5,value:43},{name:"Kewaunee","hc-key":"us-wi-061",region:5,value:44},{name:"Portage","hc-key":"us-wi-097",region:4,value:45},{name:"Calumet","hc-key":"us-wi-015",region:5,value:46},{name:"La Crosse","hc-key":"us-wi-063",region:3,value:47},{name:"Marathon","hc-key":"us-wi-073",region:4,value:48},{name:"Burnett","hc-key":"us-wi-013",region:3,value:49},{name:"Trempealeau","hc-key":"us-wi-121",region:3,value:50},{name:"Washburn","hc-key":"us-wi-129",region:3,value:51},{name:"Pepin","hc-key":"us-wi-091",region:3,value:52},{name:"Wood","hc-key":"us-wi-141",region:4,value:53},{name:"Grant","hc-key":"us-wi-043",region:2,value:54},{name:"Lafayette","hc-key":"us-wi-065",region:2,value:55},{name:"Sheboygan","hc-key":"us-wi-117",region:5,value:56},{name:"Marquette","hc-key":"us-wi-077",region:5,value:57},{name:"Langlade","hc-key":"us-wi-067",region:4,value:58},{name:"Menominee","hc-key":"us-wi-078",region:5,value:59},{name:"Washington","hc-key":"us-wi-131",region:1,value:60},{name:"St. Croix","hc-key":"us-wi-109",region:3,value:61},{name:"Florence","hc-key":"us-wi-037",region:4,value:62},{name:"Fond du Lac","hc-key":"us-wi-039",region:5,value:63},{name:"Monroe","hc-key":"us-wi-081",region:3,value:64},{name:"Buffalo","hc-key":"us-wi-011",region:3,value:65},{name:"Door","hc-key":"us-wi-029",region:5,value:66},{name:"Polk","hc-key":"us-wi-095",region:3,value:67},{name:"Marinette","hc-key":"us-wi-075",region:5,value:68},{name:"Douglas","hc-key":"us-wi-031",region:3,value:69},{name:"Kenosha","hc-key":"us-wi-059",region:1,value:70},{name:"Manitowoc","hc-key":"us-wi-071",region:5,value:71}],dataRegion=[{name:"South Region","hc-key":"us-wi-region1",region:1,value:20},{name:"North Region","hc-key":"us-wi-region2",region:2,value:40},{name:"West Region","hc-key":"us-wi-region3",region:3,value:60},{name:"Northeast Region","hc-key":"us-wi-region4",region:4,value:80},{name:"Southeast Region","hc-key":"us-wi-region5",region:5,value:100}],dataCountry=[{"hc-key":"us-ma",name:"Massachusetts",value:0},{"hc-key":"us-wa",name:"Washington",value:1},{"hc-key":"us-ca",name:"California",value:2},{"hc-key":"us-or",name:"Oregon",value:3},{"hc-key":"us-wi",name:"Wisconsin",value:4},{"hc-key":"us-me",name:"Maine",value:5},{"hc-key":"us-mi",name:"Michigan",value:6},{"hc-key":"us-nv",name:"Nevada",value:7},{"hc-key":"us-nm",name:"New Mexico",value:8},{"hc-key":"us-co",name:"Colorado",value:9},{"hc-key":"us-wy",name:"Wyoming",value:10},{"hc-key":"us-ks",name:"Kansas",value:11},{"hc-key":"us-ne",name:"Nebraska",value:12},{"hc-key":"us-ok",name:"Oklahoma",value:13},{"hc-key":"us-mo",name:"Missouri",value:14},{"hc-key":"us-il",name:"Illinois",value:15},{"hc-key":"us-in",name:"Indiana",value:16},{"hc-key":"us-vt",name:"Vermont",value:17},{"hc-key":"us-az",name:"Arizona",value:18},{"hc-key":"us-ar",name:"Arkansas",value:19},{"hc-key":"us-tx",name:"Texas",value:20},{"hc-key":"us-ri",name:"Rhode Island",value:21},{"hc-key":"us-al",name:"Alabama",value:22},{"hc-key":"us-ga",name:"Georgia",value:23},{"hc-key":"us-ms",name:"Mississippi",value:24},{"hc-key":"us-sc",name:"South Carolina",value:25},{"hc-key":"us-nc",name:"North Carolina",value:26},{"hc-key":"us-va",name:"Virginia",value:27},{"hc-key":"us-ia",name:"Iowa",value:28},{"hc-key":"us-md",name:"Maryland",value:29},{"hc-key":"us-de",name:"Delaware",value:30},{"hc-key":"us-nj",name:"New Jersey",value:31},{"hc-key":"us-pa",name:"Pennsylvania",value:32},{"hc-key":"us-ny",name:"New York",value:33},{"hc-key":"us-id",name:"Idaho",value:34},{"hc-key":"us-sd",name:"South Dakota",value:35},{"hc-key":"us-ct",name:"Connecticut",value:36},{"hc-key":"us-nh",name:"New Hampshire",value:37},{"hc-key":"us-ky",name:"Kentucky",value:38},{"hc-key":"us-oh",name:"Ohio",value:39},{"hc-key":"us-tn",name:"Tennessee",value:40},{"hc-key":"us-wv",name:"West Virginia",value:41},{"hc-key":"us-dc",name:"District of Columbia",value:42},{"hc-key":"us-la",name:"Louisiana",value:43},{"hc-key":"us-fl",name:"Florida",value:44},{"hc-key":"us-mn",name:"Minnesota",value:45},{"hc-key":"us-mt",name:"Montana",value:46},{"hc-key":"us-nd",name:"North Dakota",value:47},{"hc-key":"us-ut",name:"Utah",value:48},{"hc-key":"us-hi",name:"Hawaii",value:49},{"hc-key":"us-ak",name:"Alaska",value:50}],chartOptions={chart:{type:"column",backgroundColor:null},title:{text:"Highcharts basic demo"},subtitle:{text:"Source: Random"},plotOptions:{series:{events:{legendItemClick:function(){if(!this.visible){var a=$('input[name="errorbar"]').bootstrapSwitch("state");return this.show(),!a&&this.linkedSeries&&this.linkedSeries[0].hide(),!1}}}},map:{borderColor:"#f0f0f0"}},tooltip:{crosshairs:!0,shared:!0},series:[{dataLabels:{enabled:!0,formatter:function(){return this.point.x%3!==0?"":this.point.name},verticalAlign:"top"}}]},mapSeries={mapData:Highcharts.maps["countries/us/us-wi-all"],joinBy:"hc-key",states:{select:{color:"#b700ff"}},dataLabels:{enabled:!1,format:"{point.name}"},allowPointSelect:!0,cursor:"pointer",point:{events:{select:function(){var a=this.value.toFixed(2);if(0>a)$("#val").text("Selected Value: "+this.name+" - No Data");else{var b="#005645";$("#val").text("Selected Value: "+this.name+" - "+a);var c=$(".chart:eq(1)").highcharts();c.yAxis[0].removePlotLine("plot-line-1"),c.yAxis[0].removePlotLine("plot-band-1"),c.yAxis[0].addPlotLine({value:a,width:3,color:b,id:"plot-line-1",dashStyle:"longdash",label:{text:this.name+" ("+this.value.toFixed(2)+")",align:"right",style:{fontSize:"11pt"}},zIndex:99});var d=$(".chartSelect .dropDownA option:selected").index(),e=csv[2*d+1].data[this.index];if(c.yAxis[0].addPlotBand({from:e[0],to:e[1],color:"rgba(50, 50, 50, 0.2)",id:"plot-band-1"}),$(".chart:eq(1)").highcharts().yAxis[0].plotLinesAndBands[0].label.toFront(),this.region){for(var f=this.region,g=0;5>g;g++)c.series[2*g].hide();c.series[2*(f-1)].show();var h=$('input[name="errorbar"]').bootstrapSwitch("state"),i=c.series[2*(f-1)];!h&&i.linkedSeries&&i.linkedSeries[0].hide()}}},unselect:function(){if(this.selected){var a=this.region,b=$(".chart:eq(1)").highcharts();b.yAxis[0].removePlotLine("plot-line-1"),b.yAxis[0].removePlotLine("plot-band-1"),$("#val").text("Selected Value: No region selected"),a&&b.series[2*(a-1)].hide()}}}}},numVars,csv=[];$(window).bind("hashchange",function(){if(window.location.href.match(/\#.*/)){var a=window.location.href.match(/\#.*/)[0].substring(1);"charts"===a?($("#content").html(templates.charts),initCharts()):$("#content").html(a?templates[a]:templates.index)}else $("#content").html(templates.index)});var dropDownOptsA=[],dropDownOptsB=["2008","2009","2010","2011","2012","2013","2014","2015"],dropDownOptsC=["State - County","State - Region","Country"],county=Highcharts.maps["countries/us/us-wi-all"],region=Highcharts.maps["countries/us/us-wi-region"],country=Highcharts.maps["countries/us/us-all"],x={title:{text:"Year"},categories:["2008","2009","2010","2011","2012"]},y={title:{text:"Values"},min:0,max:100};if(window.location.href.match(/\#.*/)){var page=window.location.href.match(/\#.*/)[0].substring(1);"charts"===page?($("#content").html(templates.charts),initCharts()):$("#content").html(page?templates[page]:templates.index)}else $("#content").html(templates.index);