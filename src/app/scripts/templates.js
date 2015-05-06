this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};

Handlebars.registerPartial("footer", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "    <span class=\"pull-right hidden-print\">\r\n      <a class=\"simpleLink\" href=\"#privacy\">Privacy Policy</a>\r\n    </span>\r\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"clearfix\"></div>\r\n\r\n<div class=\"footer\">\r\n  <span class=\"pull-left\">UW Madison SHOW and Andrew McOlash, 2014-2015</span>\r\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.hide_privacy : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\r\n";
},"useData":true}));

Handlebars.registerPartial("halfChart", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "    <div class=\"clearfix\"></div>\r\n\r\n    <nav role=\"navigation\" class=\"navbar navbar-default chartSelect\">\r\n\r\n      <!-- Brand and toggle get grouped for better mobile display -->\r\n      <div class=\"navbar-header\">\r\n        <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\r\n          <span class=\"sr-only\">Toggle navigation</span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n          <span class=\"icon-bar\"></span>\r\n        </button>\r\n        <span class=\"navbar-brand\">Chart "
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "</span>\r\n      </div>\r\n\r\n      <!-- Collection of nav links and other content for toggling -->\r\n      <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n        <div class=\"clearfix\"></div>\r\n\r\n\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.dropdown : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n      </div>\r\n    </nav>\r\n\r\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <ul id=\"chartType\" class=\"nav navbar-nav navbar-right\">\r\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.line : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"line\" data-toggle=\"pill\">\r\n            <a href=\"#\">Line</a>\r\n          </li>\r\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.spline : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"spline\" data-toggle=\"pill\">\r\n            <a href=\"#\">Spline</a>\r\n          </li>\r\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.column : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"column\" data-toggle=\"pill\">\r\n            <a href=\"#\">Bar</a>\r\n          </li>\r\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pie : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"pie\" data-toggle=\"pill\">\r\n            <a href=\"#\">Pie</a>\r\n          </li>\r\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.map : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " data-type=\"map\" data-toggle=\"pill\">\r\n            <a href=\"#\">Map</a>\r\n          </li>\r\n\r\n          <!--\r\n          <li>\r\n            <a data-toggle=\"dropdown\" href=\"#\">Dropdown <b class=\"caret\"></b></a>\r\n              <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r\n                <li><a href=\"#\">Var 1</a></li>\r\n                <li><a href=\"#\">Var 2</a></li>\r\n                <li><a href=\"#\">Var 3</a></li>\r\n                <li><a href=\"#\">Var 4</a></li>\r\n                <li><a href=\"#\">Var 5</a></li>\r\n              </ul>\r\n          </li>\r\n          -->\r\n\r\n        </ul>\r\n\r\n";
},"3":function(depth0,helpers,partials,data) {
  return " class=\"active\" ";
  },"5":function(depth0,helpers,partials,data) {
  return "\r\n        <form class=\"form-horizontal\">\r\n\r\n          <div class=\"form-group nav-select\">\r\n            <label class=\"col-sm-3 control-label\">Location</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control dropDownA\">\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-group nav-select\">\r\n            <label class=\"col-sm-3 control-label\">Variable B</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control dropDownB\">\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"form-group nav-select\">\r\n            <label class=\"col-sm-3 control-label\">Variable C</label>\r\n            <div class=\"col-sm-9\">\r\n              <select class=\"form-control dropDownC\">\r\n              </select>\r\n            </div>\r\n          </div>\r\n\r\n        </form>\r\n\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div id=\"chartContainer"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "\" class=\"col-sm-12 col-md-6 chartContainer smallChart\">\r\n  <div id=\"chart"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "\" class=\"chart col-sm-12\"></div>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.details : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"useData":true}));

Handlebars.registerPartial("header", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "active";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<header>\r\n  <nav role=\"navigation\" class=\"navbar navbar-sm navbar-default navbar-fixed-top\">\r\n\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n      <button type=\"button\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\r\n        <span class=\"sr-only\">Toggle navigation</span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <span class=\"navbar-brand\">Wisconsin Portal - SHOW Data Dissemination</span>\r\n    </div>\r\n\r\n    <!-- Collection of nav links and other content for toggling -->\r\n    <div id=\"navbarCollapse\" class=\"collapse navbar-collapse\">\r\n      <ul class=\"nav navbar-nav navbar-right\">\r\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_home : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#\">Home</a></li>\r\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_charts : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#charts\">Charts</a></li>\r\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_data : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#data\">Data Export</a></li>\r\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_about : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\"><a href=\"#about\">About</a></li>\r\n        <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.active_contact : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\"><a href=\"#contact\">Contact</a></li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n\r\n  <div id=\"cookies\" class=\"alert alert-dismissable alert-warning hidden-print\" role=\"alert\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    <p>\r\n      We use cookies on your computer to help make this website better. More details can be found in our <a class=\"simpleLink\" href=\"#privacy\">privacy policy</a>\r\n    </p>\r\n  </div>\r\n\r\n</header>\r\n\r\n<div class=\"padding-bottom hidden-print\">\r\n  <img class=\"img-responsive hidden-sm hidden-xs\" src=\"images/logo.png\" alt=\"\">\r\n  <img class=\"img-responsive visible-sm visible-xs\" src=\"images/logo-mobile.png\" alt=\"\">\r\n</div>\r\n\r\n<img class=\"img-responsive visible-print-block\" src=\"images/logo.png\" alt=\"\">\r\n";
},"useData":true}));

Handlebars.registerPartial("linechart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"chart lineChart col-xs-12\"></div>";
  },"useData":true}));

Handlebars.registerPartial("options", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "<div class=\"row options padding-bottom\">\r\n  <form>\r\n\r\n    <div class=\"col-xs-12\">\r\n      <h3>Options</h3>\r\n      <hr>\r\n    </div>\r\n\r\n    <div id=\"tagSelect\" class=\"form-group nav-select col-sm-6 col-xs-12\">\r\n      <label class=\"control-label\">Tag</label>\r\n      <select class=\"form-control dropDownTags\">\r\n        "
    + escapeExpression(((helpers.dropDownTags || (depth0 && depth0.dropDownTags) || helperMissing).call(depth0, "All", {"name":"dropDownTags","hash":{},"data":data})))
    + "\r\n      </select>\r\n    </div>\r\n\r\n    <div id=\"taggedSelect\" class=\"form-group nav-select col-sm-6 col-xs-12\">\r\n      <label class=\"control-label\">Indicator</label>\r\n      <select class=\"form-control dropDownTagsIndicators\">\r\n        "
    + escapeExpression(((helper = (helper = helpers.dropDownTagsIndicators || (depth0 != null ? depth0.dropDownTagsIndicators : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownTagsIndicators","hash":{},"data":data}) : helper)))
    + "\r\n      </select>\r\n    </div>\r\n\r\n    <div class=\"form-group nav-select col-sm-4 col-xs-6\">\r\n      <label id=\"errorbarToggle\" class=\"control-label\">Confidence Intervals</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"errorbar\">\r\n    </div>\r\n\r\n    <div class=\"form-group nav-select col-sm-4 col-xs-6\">\r\n      <label id=\"largeChartToggle\" class=\"control-label\">Large&nbsp;Charts</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"largecharts\">\r\n    </div>\r\n\r\n  </form>\r\n</div>\r\n";
},"useData":true}));

Handlebars.registerPartial("table", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\r\n\r\n  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\r\n\r\n    <div class=\"panel panel-default\">\r\n      <div data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\r\n      aria-controls=\"collapseOne\"class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\r\n        <h4 class=\"panel-title pull-left\">Data Table</h4>\r\n        <span id=\"minusIcon\" class=\"glyphicon glyphicon-minus pull-right\"></span>\r\n        <span id=\"plusIcon\" class=\"glyphicon glyphicon-plus pull-right\"></span>\r\n        <div class=\"clearfix\"></div>\r\n      </div>\r\n      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n        <div class=\"panel-body\">\r\n          <table id=\"myTable\" class=\"table table-striped table-responsive\">\r\n            <thead>\r\n              <tr>\r\n                <th>Index</th>\r\n                <th>County Name</th>\r\n                <th>Region</th>\r\n                <th>Data</th>\r\n                <th>HighCharts Id</th>\r\n              </tr>\r\n            </thead>\r\n\r\n            <tbody>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n</div>";
  },"useData":true}));

this["App"]["templates"]["about"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_about': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1>About Us</h1>\r\n  <hr/>\r\n\r\n  <p>The Survey of the Health of Wisconsin (SHOW) is a statewide public health survey\r\n    designed to help improve health in Wisconsin and throughout the world. The\r\n    program has been in operation by the University of Wisconsin School of Medicine\r\n    and Public Health since 2008. Over 3,500 Wisconsin residents have joined.\r\n    SHOW is funded by the Wisconsin Partnership Program.\r\n  </p>\r\n\r\n  <p>\r\n    The Survey of the Health of Wisconsin is designed to:\r\n    <ul>\r\n      <li>To conduct annual health surveys of Wisconsin residents and communities</li>\r\n      <li>To conduct longitudinal follow-up of survey participants</li>\r\n      <li>Enable community-specific and community-driven ancillary studies</li>\r\n    </ul>\r\n  </p>\r\n\r\n  <p>\r\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\r\n    survey of its kind to measure information on critical health conditions in\r\n    Wisconsin. The data that SHOW collects is shared with leaders, organizations\r\n    and researchers who use it to improve health in the state. Findings from SHOW\r\n    present a comprehensive picture of the health of Wisconsin residents, helping\r\n    to identify needs and target resources where they are most needed.\r\n  </p>\r\n\r\n  <p>\r\n    The Survey of the Health of Wisconsin is under the direction of Dr. F. Javier\r\n    Nieto and his team at the University of Wisconsin School of Medicine and\r\n    Public Health. The SHOW team includes experts in survey research from the UW\r\n    department of Population Health Sciences and benefits from the scientific\r\n    advice of a broad range of experts and consultants from multiple departments\r\n    at UW, the state, and around the nation.\r\n  </p>\r\n\r\n  <p>\r\n    SHOW is modeled after the Center for Disease Control's (CDC) national survey\r\n    (NHANES), which has provided key health information about the nation's health\r\n    for 35 years. With state focus, SHOW provides the more detailed information\r\n    needed to understand the unique health needs in Wisconsin.\r\n  </p>\r\n\r\n  <p>\r\n    Each year, trained Survey of the Health of Wisconsin staff knock on the doors\r\n    of randomly selected households throughout the state to invite people to\r\n    participate. All participation in SHOW is voluntary. SHOW will meet face-to-face\r\n    and privately with up to 1,000 Wisconsin residents to evaluate their health.\r\n    Because the participants in the survey are selected as a representative sample\r\n    of the state populations, the results of these surveys tell us about the health\r\n    of all Wisconsin residents.\r\n  </p>\r\n\r\n  <p>\r\n    Survey of the Health of WisconsinSHOW uses a variety of health assessments\r\n    methods to capture information not available before about the health of\r\n    Wisconsin residents. These assessments include: in-person interviews, paper\r\n    questionnaires, computer-assisted surveys, physical measurements and laboratory\r\n    tests.\r\n  </p>\r\n\r\n  <p>\r\n    SHOW measures a broad range of health information. These include many conditions\r\n    and health-related characteristics that, to date, have only been measured by\r\n    self-report. These conditions include high blood pressure and high cholesterol.\r\n    Additionally, the use of computer-assisted questionnaires provide previously\r\n    unavailable information about nutrition and exercise habits, access to health\r\n    care, health care use and other health related behaviors.\r\n  </p>\r\n\r\n  <p>\r\n    All the information collected by the Survey of the Health of Wisconsin its\r\n    confidential. SHOW publishes results in summarized fashion, but no data on\r\n    individual survey participants will be released or given away to any outside\r\n    party. With the study participant's permission, the information will be available\r\n    to qualified researchers well into the future and will be used to monitor the health\r\n    of Wisconsin communities and to design programs that improve the health of\r\n    residents.\r\n  </p>\r\n\r\n  <h1>About Our Data</h1>\r\n  <hr/>\r\n\r\n  <p>\r\n    In order to more fully understand our data we are currently working on explaining\r\n    what each of our indicators represents. <a href=\"#\">Here</a> is what we have\r\n    so far.\r\n  </p>\r\n\r\n  <p>\r\n    You should keep in mind that each county and region will have different sample sizes, and therefore the confidence intervals are different.\r\n  </p>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["charts"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_charts': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1 class=\"pull-left\">Data Charts</h1>\r\n  <button class=\"btn btn-default pull-right startTour hidden-print\">Start Tour</button>\r\n  <div class=\"clearfix\"></div>\r\n  <hr/>\r\n\r\n  <div id=\"newTour\" class=\"alert alert-dismissable alert-success hidden-print collapse\" role=\"alert\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    <p>\r\n      It looks like you are new to the Wisc-Portal website. If you\r\n      have never used the charts section of this portal before, you should take\r\n      our quick tour of how to use this part of the tool!<br><br>\r\n      <button class=\"btn btn-success startTour\">Start Tour</button>\r\n    </p>\r\n  </div>\r\n\r\n";
  stack1 = this.invokePartial(partials.options, '  ', 'options', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <!-- <h2 id=\"val\" class=\"hidden-print\">Selected Value: No region selected</h2> -->\r\n\r\n  <div id=\"sampleAlert\" class=\"alert alert-danger hidden-print\" role=\"alert\">\r\n    <b>Warning: </b>This county has a small sample size, take caution when making\r\n    any assumptions based on this data. It is prone to have a large error.\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n";
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
  buffer += "  </div>\r\n\r\n  <div class=\"row\">\r\n    <p id=\"description\" class=\"col-sm-9 col-xs-12\"></p>\r\n    <div class=\"col-sm-3 col-xs-12 hidden-print\">\r\n      <button id=\"dataExport\" class=\"btn btn-lg btn-primary pull-right\">Export this data</button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"clearfix\"></div>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["contact"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_contact': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1>Contact Us</h1>\r\n\r\n  <hr/>\r\n\r\n  <address>\r\n    <strong>Survey of the Health of Wisconsin</strong><br>\r\n    Medical Sciences Center, Room 1083<br>\r\n    1300 University Avenue<br>\r\n    Madison, WI 53706<br>\r\n    Map and directions\r\n  </address>\r\n\r\n  <address>\r\n    <strong>Phone: (608) 890-3840</strong><br>\r\n    Toll-free: (888) 433-7469<br>\r\n    Fax: (608) 890-3844<br>\r\n  </address>\r\n\r\n  <address>\r\n    <strong>Email: </strong><a href=\"mailto:info@show.wisc.edu\">info@show.wisc.edu</a>\r\n  </address>\r\n\r\n  <p class=\"socialIcon\">\r\n    <a href=\"http://www.facebook.com/pages/UW-Survey-of-the-Health-of-Wisconsin/106097459501452\">\r\n      <img src=\"images/img-fb-icon-100.png\"/>\r\n      Like us on Facebook\r\n    </a>\r\n  </p>\r\n\r\n  <p class=\"socialIcon\">\r\n    <a href=\"https://twitter.com/uwshow\">\r\n      <img src=\"images/img-twitter-icon-100.png\"/>\r\n      Follow us on Twitter\r\n    </a>\r\n  </p>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["data"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_data': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1 class=\"hidden-print pull-left\">Download Our Data</h1>\r\n  <button class=\"hidden-print btn btn-default pull-right startTour\">Start Tour</button>\r\n  <div class=\"clearfix\"></div>\r\n\r\n  <hr class=\"hidden-print\"/>\r\n\r\n  <p class=\"hidden-print\">\r\n    The data that we have is availible to the public. Below we have developed a\r\n    simple tool to extract parts of the sample data that is used on this site.\r\n    If you would like a more specific set of data, you can work with our group\r\n    to tailor our data to your needs by\r\n    <a href=\"#contact\">contacting us</a>.\r\n  </p>\r\n\r\n  <div id=\"newTour\" class=\"alert alert-dismissable alert-success hidden-print collapse\" role=\"alert\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    <p>\r\n      It looks like you are new to the Wisc-Portal website. If you\r\n      have never used the data download section of this portal before, you should\r\n      take our quick tour of how to use this part of the tool!<br><br>\r\n      <button class=\"btn btn-success startTour\">Start Tour</button>\r\n    </p>\r\n  </div>\r\n\r\n  <h3>Data Download</h3>\r\n\r\n  <div class=\"row hidden-print\" id=\"topOptions\">\r\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\" id=\"county\">\r\n      <label id=\"toggleCounty\" class=\"control-label\">County Data</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"county\">\r\n    </div>\r\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\r\n      <label id=\"toggleRegion\" class=\"control-label\">Region Data</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"region\">\r\n    </div>\r\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\r\n      <label id=\"toggleState\" class=\"control-label\">State Data</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"state\">\r\n    </div>\r\n    <div class=\"form-group nav-select col-xs-4 col-sm-3\">\r\n      <label id=\"toggleConfidence\" class=\"control-label\">Confidence Data</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"errors\">\r\n    </div>\r\n    <!-- <div class=\"form-group nav-select col-xs-4 col-sm-3\">\r\n      <label class=\"control-label\">Country&nbsp;Data</label>\r\n      <br>\r\n      <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"country\">\r\n    </div> -->\r\n  </div>\r\n\r\n  <div class=\"row hidden-print\" id=\"bottomOptions\">\r\n    <div class=\"form-group nav-select col-xs-6\" id=\"county1\">\r\n      <label id=\"selectCounty\" class=\"control-label\">County</label>\r\n      <select disabled class=\"form-control dropDownCounty\">\r\n        "
    + escapeExpression(((helper = (helper = helpers.dropDownCounty || (depth0 != null ? depth0.dropDownCounty : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownCounty","hash":{},"data":data}) : helper)))
    + "\r\n      </select>\r\n    </div>\r\n    <div class=\"form-group nav-select col-xs-6\">\r\n      <label id=\"selectIndicators\" class=\"control-label\">Indicator</label>\r\n      <select class=\"form-control dropDownIndicators\">\r\n        "
    + escapeExpression(((helper = (helper = helpers.dropDownIndicators || (depth0 != null ? depth0.dropDownIndicators : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"dropDownIndicators","hash":{},"data":data}) : helper)))
    + "\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <hr>\r\n\r\n  <div class=\"panel-group\">\r\n\r\n  <div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">\r\n      <h3 id=\"tableTitle\" class=\"panel-title\">Data Table</h3>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n      <table id=\"myTable\" class=\"table table-striped table-responsive\">\r\n\r\n      </table>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n  <div class=\"row hidden-print\">\r\n    <div class=\"col-xs-12\">\r\n      <!-- <a id=\"download\" onClick=\"downloadData()\" class=\"btn btn-primary btn-lg\" role=\"button\">Download</a> -->\r\n      <a id=\"downloadCSV\" download=\"data.csv\" href=\"#\" onclick=\"return ExcellentExport.csv(this, 'myTable');\"\r\n        class=\"btn btn-primary btn-lg\" role=\"button\">Download as CSV</a>\r\n      <a id=\"downloadExcel\" download=\"data.xls\" href=\"#\" onclick=\"return ExcellentExport.excel(this, 'myTable');\"\r\n        class=\"btn btn-success btn-lg marginLeft\" role=\"button\">Download for Excel</a>\r\n    </div>\r\n  </div>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["error"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <div class=\"col-xs-1\">\r\n    <h1>\r\n      <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n    </h1>\r\n  </div>\r\n\r\n  <div class=\"col-xs-11\">\r\n    <h1>We're sorry, something went wrong.\r\n      <br>Please refresh the page.\r\n    </h1>\r\n  </div>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_home': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1>Welcome to the SHOW Data Dissemination!</h1>\r\n  <hr/>\r\n\r\n  <p>\r\n    The Survey of the Health of Wisconsin (SHOW) is the first statewide research\r\n    survey of its kind to measure information on critical health conditions in\r\n    Wisconsin. Findings from SHOW present a comprehensive picture of the health\r\n    of Wisconsin residents, helping to identify needs and target resources where\r\n    they are most needed.\r\n  </p>\r\n  <p>\r\n    The Survey of the Health of Wisconsin is funded by the Wisconsin Partnership\r\n    Program and is under the direction of principal investigator Dr. F. Javier\r\n    Nieto and co-director Dr. Kristen Malecki and their team at the University of\r\n    Wisconsin School of Medicine and Public Health.\r\n  </p>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});

this["App"]["templates"]["privacy"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\r\n\r\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n  <h1>Privacy Policy</h1>\r\n  <hr/>\r\n  <p>\r\n    We are committed to privacy and support current industry initiatives to preserve\r\n    individual privacy rights on the Internet. Protecting your privacy on-line\r\n    is an evolving area and this website will constantly evolve to meet these demands.\r\n\r\n    <h2>Cookies</h2>\r\n    Some of our web pages utilise \"cookies\". A \"cookie\" is a small text file\r\n    that may be used, for example, to collect information about web site activity.\r\n    Some cookies and other technologies may serve to recall preferences and\r\n    information previously indicated by a web user. Most browsers allow you to\r\n    control cookies, including whether or not to accept them and how to remove them.\r\n\r\n    Some cookies are necessary for the operation of our website, if you choose to\r\n    block them some aspects of the site may not work for you. Non necessary cookies\r\n    are only set when you have given your explicit consent to their use. Such\r\n    cookies include those set by our statistics package Google Analytics.\r\n  </p>\r\n\r\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, {
    'hide_privacy': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\r\n</div>\r\n";
},"usePartial":true,"useData":true});