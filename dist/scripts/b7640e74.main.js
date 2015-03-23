"use strict";var App=App||{dropDownIndicators:{},rounding:3,sample:!0,templates:{}};App.maps={country:Highcharts.maps["countries/us/us-all"],region:Highcharts.maps["countries/us/us-wi-region"],county:Highcharts.maps["countries/us/us-wi-all"],regionNames:["Southeast","South","West","North","Northeast"],regionColors:[[247,163,92],[144,238,126],[119,152,191],[124,181,236],[67,67,72]],regionDictionary:{Adams:2,Ashland:4,Barron:3,Bayfield:4,Brown:5,Buffalo:3,Burnett:3,Calumet:5,Chippewa:3,Clark:3,Columbia:2,Crawford:2,Dane:2,Dodge:2,Door:5,Douglas:3,Dunn:3,"Eau Claire":3,Florence:4,"Fond Du Lac":5,Forest:4,Grant:2,Green:2,"Green Lake":5,Iowa:2,Iron:4,Jackson:3,Jefferson:1,Juneau:2,Kenosha:1,Kewaunee:5,"La Crosse":3,Lafayette:2,Langlade:4,Lincoln:4,Manitowoc:5,Marathon:4,Marinette:5,Marquette:5,Menominee:5,Milwaukee:1,Monroe:3,Oconto:5,Oneida:4,Outagamie:5,Ozaukee:1,Pepin:3,Pierce:3,Polk:3,Portage:4,Price:4,Racine:1,Richland:2,Rock:2,Rusk:3,Sauk:2,Sawyer:4,Shawano:5,Sheboygan:5,"St. Croix":3,Taylor:4,Trempealeau:3,Vernon:3,Vilas:4,Walworth:1,Washburn:3,Washington:1,Waukesha:1,Waupaca:5,Waushara:5,Winnebago:5,Wood:4}},this.App=this.App||{},this.App.templates=this.App.templates||{},Handlebars.registerPartial("dropdown",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<nav role="navigation" class="navbar navbar-default chartSelect">\n\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    <span class="navbar-brand">Options</span>\n  </div>\n\n\n  <div class="clearfix"></div>\n\n  <!-- Collection of nav links and other content for toggling -->\n  <div id="dataCollapse" class="collapse navbar-collapse">\n    <form>\n\n      <div class="form-group nav-select col-sm-5 col-xs-12">\n        <label class="control-label">Indicator</label>\n        <select class="form-control dropDownIndicators">\n          '+h((e=null!=(e=b.dropDownIndicators||(null!=a?a.dropDownIndicators:a))?e:g,typeof e===f?e.call(a,{name:"dropDownIndicators",hash:{},data:d}):e))+'\n        </select>\n      </div>\n\n      <!-- <div class="form-group nav-select col-sm-2">\n        <label class="control-label">Year</label>\n        <select disabled class="form-control dropDownB">\n        </select>\n      </div>\n\n      <div class="form-group nav-select col-sm-3">\n        <label class="control-label">Map Detail</label>\n        <select disabled class="form-control dropDownC">\n        </select>\n      </div> -->\n\n      <div class="form-group nav-select col-sm-offset-1 col-sm-3 col-xs-6">\n        <label class="control-label">Errorbars</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="errorbar">\n      </div>\n\n      <div class="form-group nav-select col-sm-3 col-xs-6">\n        <label class="control-label">Large&nbsp;Charts</label>\n        <br>\n        <input class="bootstrapSwitch" type="checkbox" name="largecharts">\n      </div>\n\n    </form>\n  </div>\n\n\n</nav>\n'},useData:!0})),Handlebars.registerPartial("footer",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="clearfix"></div>\n\n<div class="footer">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>'},useData:!0})),Handlebars.registerPartial("halfChart",Handlebars.template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="clearfix"></div>\n\n    <nav role="navigation" class="navbar navbar-default chartSelect">\n\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class="navbar-header">\n        <button type="button" data-target="#dataCollapse" data-toggle="collapse" class="navbar-toggle">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>\n        <span class="navbar-brand">Chart '+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'</span>\n      </div>\n\n      <!-- Collection of nav links and other content for toggling -->\n      <div id="dataCollapse" class="collapse navbar-collapse">\n';return e=b["if"].call(a,null!=a?a.type:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='\n        <div class="clearfix"></div>\n\n\n\n',e=b["if"].call(a,null!=a?a.dropdown:a,{name:"if",hash:{},fn:this.program(5,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n      </div>\n    </nav>\n\n"},2:function(a,b,c,d){var e,f='        <ul id="chartType" class="nav navbar-nav navbar-right">\n          <li ';return e=b["if"].call(a,null!=a?a.line:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="line" data-toggle="pill">\n            <a href="#">Line</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.spline:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="spline" data-toggle="pill">\n            <a href="#">Spline</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.column:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="column" data-toggle="pill">\n            <a href="#">Bar</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.pie:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+=' data-type="pie" data-toggle="pill">\n            <a href="#">Pie</a>\n          </li>\n          <li ',e=b["if"].call(a,null!=a?a.map:a,{name:"if",hash:{},fn:this.program(3,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+' data-type="map" data-toggle="pill">\n            <a href="#">Map</a>\n          </li>\n\n          <!--\n          <li>\n            <a data-toggle="dropdown" href="#">Dropdown <b class="caret"></b></a>\n              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">\n                <li><a href="#">Var 1</a></li>\n                <li><a href="#">Var 2</a></li>\n                <li><a href="#">Var 3</a></li>\n                <li><a href="#">Var 4</a></li>\n                <li><a href="#">Var 5</a></li>\n              </ul>\n          </li>\n          -->\n\n        </ul>\n\n'},3:function(){return' class="active" '},5:function(){return'\n        <form class="form-horizontal">\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Location</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownA">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable B</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownB">\n              </select>\n            </div>\n          </div>\n\n          <div class="form-group nav-select">\n            <label class="col-sm-3 control-label">Variable C</label>\n            <div class="col-sm-9">\n              <select class="form-control dropDownC">\n              </select>\n            </div>\n          </div>\n\n        </form>\n\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='<div id="chartContainer'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="col-sm-12 col-md-6 chartContainer smallChart">\n  <div id="chart'+i((f=null!=(f=b.num||(null!=a?a.num:a))?f:h,typeof f===g?f.call(a,{name:"num",hash:{},data:d}):f))+'" class="chart col-sm-12"></div>\n\n';return e=b["if"].call(a,null!=a?a.details:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"\n</div>\n"},useData:!0})),Handlebars.registerPartial("header",Handlebars.template({1:function(){return"active"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<header>\n  <nav role="navigation" class="navbar navbar-default">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class="navbar-header">\n      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <span class="navbar-brand">Wisconsin Portal - ICTR Data Dissemination</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id="navbarCollapse" class="collapse navbar-collapse">\n      <ul class="nav navbar-nav navbar-right">\n        <li class="';return e=b["if"].call(a,null!=a?a.active_home:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#">Home</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_charts:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#charts">Charts</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_data:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#data">Data Export</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_about:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+='"><a href="#about">About</a></li>\n        <li class="',e=b["if"].call(a,null!=a?a.active_contact:a,{name:"if",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+'"><a href="#contact">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class="jumbotron hidden-print">\n  <img class="img-responsive" src="images/logo.png" alt="">\n</div>\n\n<img class="img-responsive visible-print-block" src="images/logo.png" alt="">\n'},useData:!0})),Handlebars.registerPartial("linechart",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="chart lineChart col-xs-12"></div>'},useData:!0})),Handlebars.registerPartial("table",Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="col-xs-12">\n\n  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">\n\n    <div class="panel panel-default">\n      <div data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"\n      aria-controls="collapseOne"class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title pull-left">Data Table</h4>\n        <span id="minusIcon" class="glyphicon glyphicon-minus pull-right"></span>\n        <span id="plusIcon" class="glyphicon glyphicon-plus pull-right"></span>\n        <div class="clearfix"></div>\n      </div>\n      <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">\n        <div class="panel-body">\n          <table id="myTable" class="table table-striped table-responsive">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>'},useData:!0})),this.App.templates.about=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_about:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>About Us</h1>\n  <hr/>\n\n  <p>The Survey of the Health of Wisconsin (SHOW) is a statewide public health survey\n    designed to help improve health in Wisconsin and throughout the world. The\n    program has been in operation by the University of Wisconsin School of Medicine\n    and Public Health since 2008. Over 3,500 Wisconsin residents have joined.\n    SHOW is funded by the Wisconsin Partnership Program.\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin is designed to:\n    <ul>\n      <li>To conduct annual health surveys of Wisconsin residents and communities</li>\n      <li>To conduct longitudinal follow-up of survey participants</li>\n      <li>Enable community-specific and community-driven ancillary studies</li>\n    </ul>\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\n    survey of its kind to measure information on critical health conditions in\n    Wisconsin. The data that SHOW collects is shared with leaders, organizations\n    and researchers who use it to improve health in the state. Findings from SHOW\n    present a comprehensive picture of the health of Wisconsin residents, helping\n    to identify needs and target resources where they are most needed.\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin is under the direction of Dr. F. Javier\n    Nieto and his team at the University of Wisconsin School of Medicine and\n    Public Health. The SHOW team includes experts in survey research from the UW\n    department of Population Health Sciences and benefits from the scientific\n    advice of a broad range of experts and consultants from multiple departments\n    at UW, the state, and around the nation.\n  </p>\n\n  <p>\n    SHOW is modeled after the Center for Disease Control's (CDC) national survey\n    (NHANES), which has provided key health information about the nation's health\n    for 35 years. With state focus, SHOW provides the more detailed information\n    needed to understand the unique health needs in Wisconsin.\n  </p>\n\n  <p>\n    Each year, trained Survey of the Health of Wisconsin staff knock on the doors\n    of randomly selected households throughout the state to invite people to\n    participate. All participation in SHOW is voluntary. SHOW will meet face-to-face\n    and privately with up to 1,000 Wisconsin residents to evaluate their health.\n    Because the participants in the survey are selected as a representative sample\n    of the state populations, the results of these surveys tell us about the health\n    of all Wisconsin residents.\n  </p>\n\n  <p>\n    Survey of the Health of WisconsinSHOW uses a variety of health assessments\n    methods to capture information not available before about the health of\n    Wisconsin residents. These assessments include: in-person interviews, paper\n    questionnaires, computer-assisted surveys, physical measurements and laboratory\n    tests.\n  </p>\n\n  <p>\n    SHOW measures a broad range of health information. These include many conditions\n    and health-related characteristics that, to date, have only been measured by\n    self-report. These conditions include high blood pressure and high cholesterol.\n    Additionally, the use of computer-assisted questionnaires provide previously\n    unavailable information about nutrition and exercise habits, access to health\n    care, health care use and other health related behaviors.\n  </p>\n\n  <p>\n    All the information collected by the Survey of the Health of Wisconsin its\n    confidential. SHOW publishes results in summarized fashion, but no data on\n    individual survey participants will be released or given away to any outside\n    party. With the study participant's permission, the information will be available\n    to qualified researchers well into the future and will be used to monitor the health\n    of Wisconsin communities and to design programs that improve the health of\n    residents.\n  </p>\n\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.App.templates.charts=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_charts:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Data Charts</h1>\n  <hr/>\n\n",e=this.invokePartial(c.dropdown,"  ","dropdown",a,void 0,b,c,d),null!=e&&(f+=e),f+='\n  <!-- <h2 id="val" class="hidden-print">Selected Value: No region selected</h2> -->\n\n  <div id="sampleAlert" class="alert alert-danger" role="alert">\n    <b>Warning: </b>This county has a small sample size, take caution when making\n    any assumptions based on this data. It is prone to have a large error.\n  </div>\n\n  <div class="row">\n',e=this.invokePartial(c.halfChart,"    ","halfChart",a,{map:!0,num:"0"},b,c,d),null!=e&&(f+=e),e=this.invokePartial(c.halfChart,"    ","halfChart",a,{column:!0,num:"1"},b,c,d),null!=e&&(f+=e),f+="  </div>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.App.templates.contact=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_contact:!0},b,c,d),null!=e&&(f+=e),f+='\n  <h1>Contact Us</h1>\n\n  <hr/>\n\n  <address>\n    <strong>Survey of the Health of Wisconsin</strong><br>\n    Medical Sciences Center, Room 1083<br>\n    1300 University Avenue<br>\n    Madison, WI 53706<br>\n    Map and directions\n  </address>\n\n  <address>\n    <strong>Phone: (608) 890-3840</strong><br>\n    Toll-free: (888) 433-7469<br>\n    Fax: (608) 890-3844<br>\n  </address>\n\n  <address>\n    <strong>Email: </strong><a href="mailto:info@show.wisc.edu">info@show.wisc.edu</a>\n  </address>\n\n  <p class="socialIcon">\n    <a href="http://www.facebook.com/pages/UW-Survey-of-the-Health-of-Wisconsin/106097459501452">\n      <img src="images/img-fb-icon-100.png"/>\n      Like us on Facebook\n    </a>\n  </p>\n\n  <p class="socialIcon">\n    <a href="https://twitter.com/uwshow">\n      <img src="images/img-twitter-icon-100.png"/>\n      Follow us on Twitter\n    </a>\n  </p>\n\n',e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.App.templates.data=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_data:!0},b,c,d),null!=e&&(j+=e),j+='\n  <h1>Download Our Data</h1>\n  <hr/>\n\n  <p>\n    The data that we have is availible to the public. Below we have developed a\n    simple tool to extract parts of the sample data that is used on this site.\n    If you would like a more specific set of data, you can work with our group\n    to tailor our data to your needs by\n    <a href="#contact">contacting us</a>.\n  </p>\n\n  <h3>Data Download</h3>\n\n  <div class="row">\n    <div class="form-group nav-select col-xs-4 col-sm-3">\n      <label class="control-label">County&nbsp;Data</label>\n      <br>\n      <input class="bootstrapSwitch" type="checkbox" name="county">\n    </div>\n    <div class="form-group nav-select col-xs-4 col-sm-3">\n      <label class="control-label">Region&nbsp;Data</label>\n      <br>\n      <input class="bootstrapSwitch" type="checkbox" name="region">\n    </div>\n    <div class="form-group nav-select col-xs-4 col-sm-3">\n      <label class="control-label">State&nbsp;Data</label>\n      <br>\n      <input class="bootstrapSwitch" type="checkbox" name="state">\n    </div>\n    <div class="form-group nav-select col-xs-4 col-sm-3">\n      <label class="control-label">Error&nbsp;Data</label>\n      <br>\n      <input class="bootstrapSwitch" type="checkbox" name="errors">\n    </div>\n    <!-- <div class="form-group nav-select col-xs-4 col-sm-3">\n      <label class="control-label">Country&nbsp;Data</label>\n      <br>\n      <input class="bootstrapSwitch" type="checkbox" name="country">\n    </div> -->\n  </div>\n\n  <div class="row">\n    <div class="form-group nav-select col-xs-6">\n      <label class="control-label">County</label>\n      <select disabled class="form-control dropDownCounty">\n        '+i((f=null!=(f=b.dropDownCounty||(null!=a?a.dropDownCounty:a))?f:h,typeof f===g?f.call(a,{name:"dropDownCounty",hash:{},data:d}):f))+'\n      </select>\n    </div>\n    <div class="form-group nav-select col-xs-6">\n      <label class="control-label">Indicator</label>\n      <select class="form-control dropDownIndicators">\n        '+i((f=null!=(f=b.dropDownIndicators||(null!=a?a.dropDownIndicators:a))?f:h,typeof f===g?f.call(a,{name:"dropDownIndicators",hash:{},data:d}):f))+'\n      </select>\n    </div>\n  </div>\n\n  <hr>\n\n  <div class="panel-group">\n\n  <div class="panel panel-default">\n    <div class="panel-heading">\n      <h3 class="panel-title">Data Table</h3>\n    </div>\n    <div class="panel-body">\n      <table id="myTable" class="table table-striped table-responsive">\n\n      </table>\n    </div>\n  </div>\n\n</div>\n\n  <div class="row">\n    <div class="col-xs-12">\n      <!-- <a id="download" onClick="downloadData()" class="btn btn-primary btn-lg" role="button">Download</a> -->\n      <a download="data.csv" href="#" onclick="return ExcellentExport.csv(this, \'myTable\');"\n        class="btn btn-primary btn-lg" role="button">Download as CSV</a>\n      <a download="data.xls" href="#" onclick="return ExcellentExport.excel(this, \'myTable\');"\n        class="btn btn-success btn-lg marginLeft" role="button">Download for Excel</a>\n    </div>\n  </div>\n\n',e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(j+=e),j+"\n</div>\n"},usePartial:!0,useData:!0}),this.App.templates.error=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_home:!0},b,c,d),null!=e&&(f+=e),f+='\n  <div class="col-xs-1">\n    <h1>\n      <span class="glyphicon glyphicon-remove-circle"></span>\n    </h1>\n  </div>\n\n  <div class="col-xs-11">\n    <h1>We\'re sorry, something went wrong.\n      <br>Please refresh the page.\n    </h1>\n  </div>\n\n',e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),this.App.templates.index=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="container">\n\n';return e=this.invokePartial(c.header,"  ","header",a,{active_home:!0},b,c,d),null!=e&&(f+=e),f+="\n  <h1>Welcome to the SHOW Data Dissemination!</h1>\n\n  <p>\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\n    survey of its kind to measure information on critical health conditions in\n    Wisconsin. Findings from SHOW present a comprehensive picture of the health\n    of Wisconsin residents, helping to identify needs and target resources where\n    they are most needed.\n  </p>\n  <p>\n    The Survey of the Health of Wisconsin is funded by the Wisconsin Partnership\n    Program and is under the direction of principal investigator Dr. F. Javier\n    Nieto and co-director Dr. Kristen Malecki and their team at the University of\n    Wisconsin School of Medicine and Public Health.\n  </p>\n\n",e=this.invokePartial(c.footer,"  ","footer",a,void 0,b,c,d),null!=e&&(f+=e),f+"\n</div>\n"},usePartial:!0,useData:!0}),App.helpers={},App.helpers.helperSetup=function(){Handlebars.registerHelper("dropDownIndicators",function(a){var b;return $.each(App.dropDownIndicators,function(){var c="";this[0]===a&&(c="selected"),b+="<option "+c+' value="'+this[0]+'" data-variable="'+this[1]+'">'+this[0]+"</option>"}),new Handlebars.SafeString(b)}),Handlebars.registerHelper("dropDownCounty",function(a){var b=[];b.push("All Counties");for(var c in App.maps.regionDictionary)b.push(c);var d="";return $.each(b,function(){var b="";this===a&&(b="selected"),d+="<option "+b+' value="'+this+'">'+this+"</option>"}),new Handlebars.SafeString(d)})},App.watchers={},window.onerror=function(a,b,c){return $("#content").html(App.templates.error),_gaq&&_gaq.push(["_trackEvent","Global","Exception",b+"("+c+"): "+a]),!1},$(window).bind("hashchange",function(){App.misc.initTemplates()}),App.watchers.downloadWatchers=function(){$('input[name="county"]').on("switchChange.bootstrapSwitch",function(a,b){$(".dropDownCounty").prop("disabled",!b)}),$("input").on("switchChange.bootstrapSwitch",function(){App.download.fillTable()}),$("select").change(function(){var a=$(".dropDownIndicators option:selected").data("variable");App.data.currentMap=App.data.getAreaData("county",a),App.data.currentLine=App.data.getLineData(a),App.download.fillTable()})},App.watchers.chartWatchers=function(){$(".dropDownIndicators").change(function(){var a=$("option:selected",this).data("variable"),b=$("option:selected",this).val(),c=$(".chart:eq(0)").highcharts(),d=$(".chart:eq(1)").highcharts();$("#val").text("Selected Value: No region selected"),App.data.currentMap=App.data.getAreaData("county",a),c.destroy(),App.charts.createMap($(".chart:eq(0)"),App.data.currentMap.observations,App.maps.county,b),App.data.currentLine=App.data.getLineData(a),d.destroy(),App.charts.createChart($(".chart:eq(1)"),"line",App.data.currentLine,[],App.charts.y,b),d=$(".chart:eq(1)").highcharts();var e="percent"===App.data.currentLine.data_type,f=e?"Percent %":"Value";d.yAxis[0].setTitle({text:f})}),$('input[name="errorbar"]').on("switchChange.bootstrapSwitch",function(a,b){var c=$(".chart:eq(1)").highcharts();$.each(c.series,function(){"errorbar"===this.options.type&&this.linkedParent.visible&&(b?this.show():this.hide())})}),$('input[name="largecharts"]').on("switchChange.bootstrapSwitch",function(){var a=$(".chart:eq(0)"),b=$(".chart:eq(1)");a.parent().toggleClass("col-md-6"),b.parent().toggleClass("col-md-6"),a.parent().toggleClass("largeChart"),b.parent().toggleClass("largeChart"),a.parent().toggleClass("smallChart"),b.parent().toggleClass("smallChart"),a.highcharts().reflow(),a.highcharts().redraw(),b.highcharts().reflow(),b.highcharts().redraw()})},App.data={currentMap:{},currentLine:{},gotData:!1,json:{}},App.data.transformData=function(a,b,c,d){var e,f;return a?(e=parseFloat(((a+b)*(c?100:1)).toFixed(App.rounding)),f=parseFloat(((a-b)*(c?100:1)).toFixed(App.rounding)),a=parseFloat((a*(c?100:1)).toFixed(App.rounding))):(e="county"===d?-1:null,f="county"===d?-1:null,a="county"===d?-1:null),[a,f,e]},App.data.getAreaData=function(a,b){if(App.data.json[a][b]){var c=$.extend(!0,{},App.data.json[a][b]),d="percent"===c.data_type;return c.error=[],$.each(c.observations,function(b,e){c.error.push({}),c.error[b].data=[],c.error[b].name=e.name+" - Error",c.error[b].parent=e.parent;var f=[];if(e.sample={},$.each(e.data,function(g,h){f=App.data.transformData(h[1],h[2],d,a),c.error[b].data[g]=[h[0],f[1],f[2]],h[1]=f[0],e.sample[h[0]]=h[3],h.splice(2,2)}),"county"===a){e.value=e.data[0][1],e.region=e.parent,e["hc-key"]=e.id;var g=App.misc.convertColor(App.maps.regionColors[e.region-1],e.value/50,App.misc.colors.white);App.sample&&(g=App.maps.regionColors[e.region-1]),e.color=App.misc.toRGB(g),delete e.parent,delete e.data}else c.error[b].linkedTo=e.id}),c}return{}},App.data.getCurrentCountyData=function(a){var b=$.grep(App.data.currentMap.observations,function(b){return b.name===a});return b[0]},App.data.getCurrentCountyError=function(a){var b=$.grep(App.data.currentMap.error,function(b){return b.name===a+" - Error"});return b[0].data[0]},App.data.getLineData=function(a){var b=App.data.getAreaData("region",a),c=App.data.getAreaData("state",a),d=[];if($.isEmptyObject(b)||(d.data_type=b.data_type,$.each(b.observations,function(){this.visible=!1,d.push(this)}),$.each(b.error,function(){this.type="errorbar",this.visible=!1,d.push(this)})),!$.isEmptyObject(c)){d.push(c.observations[0]);var e=c.error[0];e.type="errorbar",e.visible=$('input[name="errorbar"]').bootstrapSwitch("state"),d.push(e)}return d.sort(function(a,b){var c=a.name.toLowerCase(),d=b.name.toLowerCase();return d>c?-1:c>d?1:0}),d},App.data.getData=function(a){$.getJSON("data/data.json",function(b){App.data.json=b,$.each(App.data.json,function(){$.each(this,function(a){App.dropDownIndicators[a]=[this.name,a]})}),App.helpers.helperSetup(),App.data.gotData=!0,a.resolve()}).fail(function(){$("#content").html(App.templates.error),a.fail()})},App.download={},App.download.addRow=function(a,b,c,d,e){var f=" - ";-1===c&&(c="No Data",d="No Data",f="",e="");var g=$('input[name="errors"]').bootstrapSwitch("state"),h=g?"<td>"+d+f+e+"</td>":"";$("#myTable").append("<tr><td>"+a+"</td><td>"+b+"</td><td>"+c+"</td>"+h)},App.download.addArea=function(a,b){var c=App.data.getAreaData(a,b);"county"===a&&(App.data.currentMap=c),$.each(c.observations,function(b,d){var e=d.name,f="",g="",h="";"county"!==a?$.each(d.data,function(a,d){f=d[0],g=d[1],h=c.error[b].data[a],-1!==g&&App.download.addRow(e,f,g,h[1],h[2])}):(g=App.data.getCurrentCountyData(e).value,h=App.data.getCurrentCountyError(e),-1!==g&&App.download.addRow(e,f,g,h[1],h[2]))})},App.download.fillTable=function(){var a=$(".dropDownIndicators option:selected").data("variable"),b=$(".dropDownIndicators option:selected").text(),c=$(".dropDownCounty option:selected").text(),d=$('input[name="county"]').bootstrapSwitch("state"),e=$('input[name="region"]').bootstrapSwitch("state"),f=$('input[name="state"]').bootstrapSwitch("state"),g=$('input[name="errors"]').bootstrapSwitch("state"),h=g?"<th>"+b+" - Error</th>":"";if($("#myTable").empty(),$("#myTable").append("<tr><th>Name</th><th>Year</th><th>"+b+"</th>"+h+"</tr>"),d)if("All Counties"===c)App.download.addArea("county",a);else{App.data.currentMap=App.data.getAreaData("county",a);var i=App.data.getCurrentCountyData(c).value,j=App.data.getCurrentCountyError(c);App.download.addRow(c,"",i,j[1],j[2])}e&&App.download.addArea("region",a),f&&App.download.addArea("state",a)},App.charts={x:{title:{text:"Year"},categories:["2008","2009","2010","2011","2012","2013","2014","2015"]},y:{title:{text:"Percent %"},min:0}},App.charts.createChart=function(a,b,c,d,e,f){var g=$.extend(!0,{},App.charts.chartOptions);switch(g.series=$.extend(!0,[],c),d&&0!==d.length&&(g.xAxis=d),e&&0!==e.length&&(g.yAxis=e),f&&(g.title.text=f),b){case"line":g.chart.type="line",a.highcharts(g);break;case"spline":g.chart.type="spline",a.highcharts(g);break;case"column":g.chart.type="column",a.highcharts(g);break;case"pie":g.chart.type="pie",a.highcharts(g);break;case"map":g.chart.type="map";var h=$.extend(!0,{},App.charts.mapOptions);g.colorAxis=h.colorAxis,g.tooltip=h.tooltip,g.legend=h.legend,a.highcharts("Map",g)}},App.charts.createMap=function(a,b,c,d){var e=new Array($.extend(!0,{},App.charts.mapSeries));e[0].data=b,e[0].mapData=c,e[0].name=d,e.push({type:"mapline",name:"Borders",color:"black",data:App.maps.region,enableMouseTracking:!1}),App.charts.createChart(a,"map",e,[],[],d)},App.charts.setupCharts=function(){var a=$(".dropDownIndicators option:selected").data("variable"),b=$(".dropDownIndicators option:selected").val();App.data.currentMap=App.data.getAreaData("county",a),App.charts.createMap($(".chart:eq(0)"),App.data.currentMap.observations,App.maps.county,b),App.data.currentLine=App.data.getLineData(a),App.charts.createChart($(".chart:eq(1)"),"line",App.data.currentLine,[],App.charts.y,b);var c=$(".chart:eq(1)").highcharts(),d=$('input[name="errorbar"]').bootstrapSwitch("state");$.each(c.series,function(){"Wisconsin"===this.name||"United States"===this.name?this.show():"errorbar"===this.options.type&&d||this.hide()});var e="percent"===App.data.currentLine.data_type,f=e?"Percent %":"Value";$(".chart:eq(1)").highcharts().yAxis[0].setTitle({text:f}),App.watchers.chartWatchers()
},App.charts.chartOptions={chart:{type:"column",backgroundColor:null},title:{text:"Highcharts basic demo"},subtitle:{text:"Source: UW SHOW Data"},plotOptions:{series:{events:{legendItemClick:function(){if(!this.visible){var a=$('input[name="errorbar"]').bootstrapSwitch("state");return this.show(),!a&&this.linkedSeries&&this.linkedSeries[0].hide(),!1}}}},map:{borderColor:"#f0f0f0"},mapline:{lineWidth:3}},tooltip:{crosshairs:!0,shared:!0,formatter:function(){var a='<span style="font-size: 10px">'+this.points[0].key+"</span><br/>";return $.each(this.points,function(){var b="";App.data.currentLine[this.series.index].sample&&(b=", Sample Size: "+App.data.currentLine[this.series.index].sample[this.point.x]);var c;c=this.point.low&&this.point.high?this.point.low+" - "+this.point.high:this.point.y;var d="#000000"!==this.series.color?this.series.color:"#aaaaaa";a+='<span style="color:'+d+'">●</span> '+this.series.name+": <b>"+c+"</b>"+b+"<br/>"}),a}},series:[{dataLabels:{enabled:!0,formatter:function(){return this.point.x%3!==0?"":this.point.name},verticalAlign:"top"}}],legend:{itemStyle:{fontSize:"14px"}}},App.charts.mapOptions={legend:{enabled:!1},tooltip:{backgroundColor:"rgba(255, 255, 255, 0.95)",formatter:function(){var a,b,c=this.point.sample[2008];c>=75?(a="#008000",b="Excellent"):c>=40?(a="#CC6600",b="Fair"):c&&(a="#CC0000",b="Poor");var d="Value: "+this.point.value;c='<span style="color: '+a+'">Sample Size: '+this.point.sample[2008]+" ("+b+")</span>";var e="";if(-1===this.point.value||App.sample)d="",this.point.sample[2008]||(c="No Data");else{var f=App.data.getCurrentCountyError(this.point.name);e="Error Range: ("+f[1]+" - "+f[2]+")"}return"<b>"+this.series.name+"</b><br>Point name: "+this.point.name+"<br>Region: "+App.maps.regionNames[this.point.region-1]+"<br>"+d+"<br>"+e+"<br>"+c}}},App.charts.mapSeries={mapData:Highcharts.maps["countries/us/us-wi-all"],joinBy:"hc-key",states:{select:{color:"#b700ff"}},dataLabels:{enabled:!1,format:"{point.name}"},allowPointSelect:!0,cursor:"pointer",point:{events:{select:function(){var a=this.value,b="#005645";this.sample[2008]<40?$("#sampleAlert").slideDown():$("#sampleAlert").slideUp();var c=$(".chart:eq(1)").highcharts();if(!App.sample){c.yAxis[0].removePlotLine("plot-line-1"),c.yAxis[0].removePlotLine("plot-band-1"),c.yAxis[0].addPlotLine({value:a,width:3,color:b,id:"plot-line-1",dashStyle:"longdash",label:{text:this.name+" ("+this.value+")",align:"right",style:{fontSize:"11pt"}}});var d=App.data.getCurrentCountyError(this.name);c.yAxis[0].addPlotBand({from:d[1],to:d[2],color:"rgba(50, 50, 50, 0.2)",id:"plot-band-1"});var e=c.yAxis[0].getExtremes().min,f=c.yAxis[0].getExtremes().dataMax,g=c.yAxis[0].tickInterval;f<d[2]?c.yAxis[0].setExtremes(e,d[2]+g):c.yAxis[0].setExtremes(null,null)}if(this.region){var h=this.region,i=$('input[name="errorbar"]').bootstrapSwitch("state"),j=App.maps.regionNames[h-1];$.each(c.series,function(a,b){b.name===j||"Wisconsin"===b.name?(b.show(),i||b.linkedSeries[0].hide()):b.visible&&"errorbar"!==b.type&&b.hide()})}},unselect:function(){if(this.selected){var a=this.region,b=$(".chart:eq(1)").highcharts();if(b.yAxis[0].removePlotLine("plot-line-1"),b.yAxis[0].removePlotLine("plot-band-1"),$("#sampleAlert").slideUp(),a){var c=App.maps.regionNames[a-1];$.each(b.series,function(a,b){(b.name===c||b.name===c+" - Error")&&b.hide()})}b.yAxis[0].setExtremes(null,null)}}}}},App.misc={colors:{black:[0,0,0],white:[255,255,255]}},App.misc.initTemplates=function(){var a=$.Deferred();App.data.gotData?a.resolve():App.data.getData(a),$.when(a).done(function(){if(window.location.href.match(/\#.*/)){var a=window.location.href.match(/\#.*/)[0].substring(1);a&&"error"!==a?($("#content").html(App.templates[a]),"data"===a?($('input[name="county"]').prop("disabled",App.sample),App.download.fillTable(),App.watchers.downloadWatchers()):"charts"===a&&(App.charts.setupCharts(),$(".alert").hide()),$(".bootstrapSwitch").bootstrapSwitch()):$("#content").html(App.templates.index)}else $("#content").html(App.templates.index)})},App.misc.humanize=function(a){for(var b=a.split("_"),c=0;c<b.length;c++)b[c]=b[c].charAt(0).toUpperCase()+b[c].slice(1);return b.join(" ")},App.misc.convertColor=function(a,b,c){var d=[];return b>0&&(b+=.25),d[0]=(1-b)*c[0]+b*a[0],d[1]=(1-b)*c[1]+b*a[1],d[2]=(1-b)*c[2]+b*a[2],d},App.misc.toRGB=function(a){return"rgba("+Math.floor(a[0])+", "+Math.floor(a[1])+", "+Math.floor(a[2])+", 1.0)"},App.misc.initTemplates();