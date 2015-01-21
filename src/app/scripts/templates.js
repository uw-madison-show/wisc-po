Handlebars.registerPartial("footer", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"clearfix\"></div>\n\n<div class=\"footer\">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>";
  },"useData":true}));

Handlebars.registerPartial("halfChart", Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return " class=\"active\" ";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"col-xs-12 col-md-6 chartContainer\">\n  <nav role=\"navigation\" class=\"navbar navbar-default chartSelect\">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <span class=\"navbar-brand\">Chart "
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\n      <ul id=\"chartType\" class=\"nav navbar-nav navbar-right\">\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.line : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"line\" data-toggle=\"pill\">\n          <a href=\"#\">Line</a>\n        </li>\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.spline : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"spline\" data-toggle=\"pill\">\n          <a href=\"#\">Spline</a>\n        </li>\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.column : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"column\" data-toggle=\"pill\">\n          <a href=\"#\">Bar</a>\n        </li>\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pie : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " data-type=\"pie\" data-toggle=\"pill\">\n          <a href=\"#\">Pie</a>\n        </li>\n        <li ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.map : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + " data-type=\"map\" data-toggle=\"pill\">\n          <a href=\"#\">Map</a>\n        </li>\n\n        <!--\n        <li>\n          <a data-toggle=\"dropdown\" href=\"#\">Dropdown <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n              <li><a href=\"#\">Var 1</a></li>\n              <li><a href=\"#\">Var 2</a></li>\n              <li><a href=\"#\">Var 3</a></li>\n              <li><a href=\"#\">Var 4</a></li>\n              <li><a href=\"#\">Var 5</a></li>\n            </ul>\n        </li>\n        -->\n\n      </ul>\n\n      <div class=\"clearfix\"></div>\n\n      <form class=\"form-horizontal\">\n\n        <div class=\"form-group nav-select\">\n          <label class=\"col-sm-4 control-label\">Variable A</label>\n          <div class=\"col-sm-8\">\n            <select class=\"form-control dropDownA\">\n            </select>\n          </div>\n        </div>\n\n        <div class=\"form-group nav-select\">\n          <label class=\"col-sm-4 control-label\">Variable B</label>\n          <div class=\"col-sm-8\">\n            <select class=\"form-control dropDownB\">\n            </select>\n          </div>\n        </div>\n\n      </form>\n\n    </div>\n  </nav>\n\n  <div class=\"chart col-xs-12\"></div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("header", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header>\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <span class=\"navbar-brand\">Wisconsin Portal - HighCharts</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"navbarCollapse\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\">Home</a></li>\n        <li class=\"active\"><a href=\"#\">Data</a></li>\n        <li><a href=\"#\">About</a></li>\n        <li><a href=\"#\">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class=\"jumbotron\">\n  <img class=\"img-responsive\" src=\"images/logo.png\" alt=\"\">\n</div>";
  },"useData":true}));

Handlebars.registerPartial("linechart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"chart lineChart col-xs-12\"></div>";
  },"useData":true}));

Handlebars.registerPartial("table", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\n\n  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n\n    <div class=\"panel panel-default\">\n      <div data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\n      aria-controls=\"collapseOne\"class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n        <h4 class=\"panel-title pull-left\">Data Table</h4>\n        <span id=\"minusIcon\" class=\"glyphicon glyphicon-minus pull-right\"></span>\n        <span id=\"plusIcon\" class=\"glyphicon glyphicon-plus pull-right\"></span>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n        <div class=\"panel-body\">\n          <table id=\"myTable\" class=\"table table-striped table-responsive\">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>";
  },"useData":true}));

this["templates"] = this["templates"] || {};

this["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <hr>\n\n  <h1>\n    <span clas=\"pull-left\">Hello, world - from Highcharts / Highmaps</span>\n    <button id=\"randomData\" class=\"btn btn-default pull-right\">Randomize the Data!</button>\n  </h1>\n\n  <h3 class=\"padding-bottom\">\n    Number of Charts:\n    <div class=\"btn-group\" data-toggle=\"buttons\">\n      <label id=\"on\" class=\"btn btn-default\">\n        <input type=\"radio\" name=\"numcharts\" autocomplete=\"off\" value=\"1\">1 Chart\n      </label>\n      <label id=\"off\" class=\"btn btn-default active\">\n        <input type=\"radio\" name=\"numcharts\" autocomplete=\"off\" value=\"2\" checked>2 Charts\n      </label>\n    </div>\n  </h3>\n\n  <div class=\"row\">\n";
  stack1 = this.invokePartial(partials.halfChart, '    ', 'halfChart', depth0, {
    'map': (true),
    'num': ("1")
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  stack1 = this.invokePartial(partials.halfChart, '    ', 'halfChart', depth0, {
    'column': (true),
    'num': ("2")
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n\n  <div class=\"btn-group\" data-toggle=\"buttons\">\n    <label id=\"on\" class=\"btn btn-default\">\n      <input type=\"radio\" name=\"errorbar\" autocomplete=\"off\" value=\"true\">Show Errorbars\n    </label>\n    <label id=\"off\" class=\"btn btn-default active\">\n      <input type=\"radio\" name=\"errorbar\" autocomplete=\"off\" value=\"false\" checked>Hide Errorbars\n    </label>\n  </div>\n\n  <div class=\"row\">\n";
  stack1 = this.invokePartial(partials.linechart, '    ', 'linechart', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n\n  <hr>\n\n  <div class=\"row\">\n";
  stack1 = this.invokePartial(partials.table, '    ', 'table', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"usePartial":true,"useData":true});