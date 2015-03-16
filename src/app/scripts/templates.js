this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};

Handlebars.registerPartial("dropdown", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<nav role=\"navigation\" class=\"navbar navbar-default chartSelect\">\n\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class=\"navbar-header\">\n    <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n    <span class=\"navbar-brand\">Options</span>\n  </div>\n\n\n  <div class=\"clearfix\"></div>\n\n  <!-- Collection of nav links and other content for toggling -->\n  <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\n    <form>\n\n      <div class=\"form-group nav-select col-sm-5 col-xs-12\">\n        <label class=\"control-label\">Factor</label>\n        <select class=\"form-control dropDownIndicators\">\n          "
    + escapeExpression(((helper = (helper = helpers.dropDownIndicators || (depth0 != null ? depth0.dropDownIndicators : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownIndicators","hash":{},"data":data}) : helper)))
    + "\n        </select>\n      </div>\n\n      <!-- <div class=\"form-group nav-select col-sm-2\">\n        <label class=\"control-label\">Year</label>\n        <select disabled class=\"form-control dropDownB\">\n        </select>\n      </div>\n\n      <div class=\"form-group nav-select col-sm-3\">\n        <label class=\"control-label\">Map Detail</label>\n        <select disabled class=\"form-control dropDownC\">\n        </select>\n      </div> -->\n\n      <div class=\"form-group nav-select col-sm-offset-1 col-sm-3 col-xs-6\">\n        <label class=\"control-label\">Errorbars</label>\n        <br>\n        <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"errorbar\">\n      </div>\n\n      <div class=\"form-group nav-select col-sm-3 col-xs-6\">\n        <label class=\"control-label\">Large&nbsp;Charts</label>\n        <br>\n        <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"largecharts\">\n      </div>\n\n    </form>\n  </div>\n\n\n</nav>\n";
},"useData":true}));

Handlebars.registerPartial("footer", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"clearfix\"></div>\n\n<div class=\"footer\">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>";
  },"useData":true}));

Handlebars.registerPartial("halfChart", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <div class=\"clearfix\"></div>\n\n    <nav role=\"navigation\" class=\"navbar navbar-default chartSelect\">\n\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <span class=\"navbar-brand\">Chart "
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "</span>\n      </div>\n\n      <!-- Collection of nav links and other content for toggling -->\n      <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        <div class=\"clearfix\"></div>\n\n\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.dropdown : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n      </div>\n    </nav>\n\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <ul id=\"chartType\" class=\"nav navbar-nav navbar-right\">\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.line : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"line\" data-toggle=\"pill\">\n            <a href=\"#\">Line</a>\n          </li>\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.spline : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"spline\" data-toggle=\"pill\">\n            <a href=\"#\">Spline</a>\n          </li>\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.column : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"column\" data-toggle=\"pill\">\n            <a href=\"#\">Bar</a>\n          </li>\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pie : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"pie\" data-toggle=\"pill\">\n            <a href=\"#\">Pie</a>\n          </li>\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.map : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " data-type=\"map\" data-toggle=\"pill\">\n            <a href=\"#\">Map</a>\n          </li>\n\n          <!--\n          <li>\n            <a data-toggle=\"dropdown\" href=\"#\">Dropdown <b class=\"caret\"></b></a>\n              <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n                <li><a href=\"#\">Var 1</a></li>\n                <li><a href=\"#\">Var 2</a></li>\n                <li><a href=\"#\">Var 3</a></li>\n                <li><a href=\"#\">Var 4</a></li>\n                <li><a href=\"#\">Var 5</a></li>\n              </ul>\n          </li>\n          -->\n\n        </ul>\n\n";
},"3":function(depth0,helpers,partials,data) {
  return " class=\"active\" ";
  },"5":function(depth0,helpers,partials,data) {
  return "\n        <form class=\"form-horizontal\">\n\n          <div class=\"form-group nav-select\">\n            <label class=\"col-sm-3 control-label\">Location</label>\n            <div class=\"col-sm-9\">\n              <select class=\"form-control dropDownA\">\n              </select>\n            </div>\n          </div>\n\n          <div class=\"form-group nav-select\">\n            <label class=\"col-sm-3 control-label\">Variable B</label>\n            <div class=\"col-sm-9\">\n              <select class=\"form-control dropDownB\">\n              </select>\n            </div>\n          </div>\n\n          <div class=\"form-group nav-select\">\n            <label class=\"col-sm-3 control-label\">Variable C</label>\n            <div class=\"col-sm-9\">\n              <select class=\"form-control dropDownC\">\n              </select>\n            </div>\n          </div>\n\n        </form>\n\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div id=\"chartContainer"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "\" class=\"col-sm-12 col-md-6 chartContainer smallChart\">\n  <div id=\"chart"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "\" class=\"chart col-sm-12\"></div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.details : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"useData":true}));

Handlebars.registerPartial("header", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "active";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<header>\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <span class=\"navbar-brand\">Wisconsin Portal - ICTR Data Dissemination</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"navbarCollapse\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_home : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#\">Home</a></li>\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_charts : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#charts\">Charts</a></li>\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_data : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#data\">Data</a></li>\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_about : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#about\">About</a></li>\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_contact : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"><a href=\"#contact\">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class=\"jumbotron hidden-print\">\n  <img class=\"img-responsive\" src=\"images/logo.png\" alt=\"\">\n</div>\n\n<img class=\"img-responsive visible-print-block\" src=\"images/logo.png\" alt=\"\">\n";
},"useData":true}));

Handlebars.registerPartial("linechart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"chart lineChart col-xs-12\"></div>";
  },"useData":true}));

Handlebars.registerPartial("table", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\n\n  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n\n    <div class=\"panel panel-default\">\n      <div data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\n      aria-controls=\"collapseOne\"class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n        <h4 class=\"panel-title pull-left\">Data Table</h4>\n        <span id=\"minusIcon\" class=\"glyphicon glyphicon-minus pull-right\"></span>\n        <span id=\"plusIcon\" class=\"glyphicon glyphicon-plus pull-right\"></span>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n        <div class=\"panel-body\">\n          <table id=\"myTable\" class=\"table table-striped table-responsive\">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>";
  },"useData":true}));

this["App"]["templates"]["about"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_about': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>About Us</h1>\n  <hr/>\n\n  <p>The Survey of the Health of Wisconsin (SHOW) is a statewide public health survey\n    designed to help improve health in Wisconsin and throughout the world. The\n    program has been in operation by the University of Wisconsin School of Medicine\n    and Public Health since 2008. Over 3,500 Wisconsin residents have joined.\n    SHOW is funded by the Wisconsin Partnership Program.\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin is designed to:\n    <ul>\n      <li>To conduct annual health surveys of Wisconsin residents and communities</li>\n      <li>To conduct longitudinal follow-up of survey participants</li>\n      <li>Enable community-specific and community-driven ancillary studies</li>\n    </ul>\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\n    survey of its kind to measure information on critical health conditions in\n    Wisconsin. The data that SHOW collects is shared with leaders, organizations\n    and researchers who use it to improve health in the state. Findings from SHOW\n    present a comprehensive picture of the health of Wisconsin residents, helping\n    to identify needs and target resources where they are most needed.\n  </p>\n\n  <p>\n    The Survey of the Health of Wisconsin is under the direction of Dr. F. Javier\n    Nieto and his team at the University of Wisconsin School of Medicine and\n    Public Health. The SHOW team includes experts in survey research from the UW\n    department of Population Health Sciences and benefits from the scientific\n    advice of a broad range of experts and consultants from multiple departments\n    at UW, the state, and around the nation.\n  </p>\n\n  <p>\n    SHOW is modeled after the Center for Disease Control's (CDC) national survey\n    (NHANES), which has provided key health information about the nation's health\n    for 35 years. With state focus, SHOW provides the more detailed information\n    needed to understand the unique health needs in Wisconsin.\n  </p>\n\n  <p>\n    Each year, trained Survey of the Health of Wisconsin staff knock on the doors\n    of randomly selected households throughout the state to invite people to\n    participate. All participation in SHOW is voluntary. SHOW will meet face-to-face\n    and privately with up to 1,000 Wisconsin residents to evaluate their health.\n    Because the participants in the survey are selected as a representative sample\n    of the state populations, the results of these surveys tell us about the health\n    of all Wisconsin residents.\n  </p>\n\n  <p>\n    Survey of the Health of WisconsinSHOW uses a variety of health assessments\n    methods to capture information not available before about the health of\n    Wisconsin residents. These assessments include: in-person interviews, paper\n    questionnaires, computer-assisted surveys, physical measurements and laboratory\n    tests.\n  </p>\n\n  <p>\n    SHOW measures a broad range of health information. These include many conditions\n    and health-related characteristics that, to date, have only been measured by\n    self-report. These conditions include high blood pressure and high cholesterol.\n    Additionally, the use of computer-assisted questionnaires provide previously\n    unavailable information about nutrition and exercise habits, access to health\n    care, health care use and other health related behaviors.\n  </p>\n\n  <p>\n    All the information collected by the Survey of the Health of Wisconsin its\n    confidential. SHOW publishes results in summarized fashion, but no data on\n    individual survey participants will be released or given away to any outside\n    party. With the study participant's permission, the information will be available\n    to qualified researchers well into the future and will be used to monitor the health\n    of Wisconsin communities and to design programs that improve the health of\n    residents.\n  </p>\n\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["charts"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_charts': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Data Charts</h1>\n  <hr/>\n\n";
  stack1 = this.invokePartial(partials.dropdown, '  ', 'dropdown', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h2 id=\"val\" class=\"hidden-print\">Selected Value: No region selected</h2>\n\n  <div class=\"row\">\n";
  stack1 = this.invokePartial(partials.halfChart, '    ', 'halfChart', depth0, {
    'map': (true),
    'num': ("0")
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.halfChart, '    ', 'halfChart', depth0, {
    'column': (true),
    'num': ("1")
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["contact"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_contact': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Contact Us</h1>\n\n  <hr/>\n\n  <address>\n    <strong>Survey of the Health of Wisconsin</strong><br>\n    Medical Sciences Center, Room 1083<br>\n    1300 University Avenue<br>\n    Madison, WI 53706<br>\n    Map and directions\n  </address>\n\n  <address>\n    <strong>Phone: (608) 890-3840</strong><br>\n    Toll-free: (888) 433-7469<br>\n    Fax: (608) 890-3844<br>\n  </address>\n\n  <address>\n    <strong>Email: </strong><a href=\"mailto:info@show.wisc.edu\">info@show.wisc.edu</a>\n  </address>\n\n  <p class=\"socialIcon\">\n    <a href=\"http://www.facebook.com/pages/UW-Survey-of-the-Health-of-Wisconsin/106097459501452\">\n      <img src=\"images/img-fb-icon-100.png\"/>\n      Like us on Facebook\n    </a>\n  </p>\n\n  <p class=\"socialIcon\">\n    <a href=\"https://twitter.com/uwshow\">\n      <img src=\"images/img-twitter-icon-100.png\"/>\n      Follow us on Twitter\n    </a>\n  </p>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["data"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_data': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Get Our Data</h1>\n  <hr/>\n\n  <p>The data that we have is availible to the public. Below we have developed a\n    simple tool to extract parts of the sample data that is used on this site.\n    If you would like a more specific set of data, you can work with our group\n    to tailor our data to your needs using the\n    <a href=\"#contact\">data request tool</a> on our contact page.\n  </p>\n\n  <h3>Data Download</h3>\n\n  <div class=\"row\">\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\n      <label class=\"control-label\">County&nbsp;Data</label>\n      <br>\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"county\" disabled>\n    </div>\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\n      <label class=\"control-label\">Region&nbsp;Data</label>\n      <br>\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"region\">\n    </div>\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\n      <label class=\"control-label\">State&nbsp;Data</label>\n      <br>\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"state\">\n    </div>\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\n      <label class=\"control-label\">Error&nbsp;Data</label>\n      <br>\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"errors\">\n    </div>\n    <!-- <div class=\"form-group nav-select col-xs-4 col-sm-3\">\n      <label class=\"control-label\">Country&nbsp;Data</label>\n      <br>\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"country\">\n    </div> -->\n  </div>\n\n  <div class=\"row\">\n    <div class=\"form-group nav-select col-xs-6\">\n      <label class=\"control-label\">County</label>\n      <select disabled class=\"form-control dropDownCounty\">\n        "
    + escapeExpression(((helper = (helper = helpers.dropDownCounty || (depth0 != null ? depth0.dropDownCounty : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownCounty","hash":{},"data":data}) : helper)))
    + "\n      </select>\n    </div>\n    <div class=\"form-group nav-select col-xs-6\">\n      <label class=\"control-label\">Factor</label>\n      <select class=\"form-control dropDownIndicators\">\n        "
    + escapeExpression(((helper = (helper = helpers.dropDownIndicators || (depth0 != null ? depth0.dropDownIndicators : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownIndicators","hash":{},"data":data}) : helper)))
    + "\n      </select>\n    </div>\n  </div>\n\n  <hr>\n\n  <div class=\"panel-group\">\n\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h3 class=\"panel-title\">Data Table</h3>\n    </div>\n    <div class=\"panel-body\">\n      <table id=\"myTable\" class=\"table table-striped table-responsive\">\n\n      </table>\n    </div>\n  </div>\n\n</div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <!-- <a id=\"download\" onClick=\"downloadData()\" class=\"btn btn-primary btn-lg\" role=\"button\">Download</a> -->\n      <a download=\"data.csv\" href=\"#\" onclick=\"return ExcellentExport.csv(this, 'myTable');\"\n        class=\"btn btn-primary btn-lg\" role=\"button\">Download as CSV</a>\n      <a download=\"data.xls\" href=\"#\" onclick=\"return ExcellentExport.excel(this, 'myTable');\"\n        class=\"btn btn-success btn-lg marginLeft\" role=\"button\">Download for Excel</a>\n    </div>\n  </div>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["error"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_home': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>\n    <span class=\"glyphicon glyphicon-remove-circle\"></span>\n    We're sorry, something went wrong.\n    <br>\n    Please refresh the page.\n  </h1>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_home': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Welcome to the SHOW Data Dissemination!</h1>\n\n  <p>\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\n    survey of its kind to measure information on critical health conditions in\n    Wisconsin. Findings from SHOW present a comprehensive picture of the health\n    of Wisconsin residents, helping to identify needs and target resources where\n    they are most needed.\n  </p>\n  <p>\n    The Survey of the Health of Wisconsin is funded by the Wisconsin Partnership\n    Program and is under the direction of principal investigator Dr. F. Javier\n    Nieto and co-director Dr. Kristen Malecki and their team at the University of\n    Wisconsin School of Medicine and Public Health.\n  </p>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});