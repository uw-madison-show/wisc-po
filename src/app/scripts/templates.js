Handlebars.registerPartial("footer", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"clearfix\"></div>\n\n<div class=\"footer\">\n  <p>UW Madison SHOW and Andrew McOlash, 2014-2015</p>\n</div>";
  },"useData":true}));

Handlebars.registerPartial("halfChart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12 col-md-6\">\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <span class=\"navbar-brand\">Data 2</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"active\">\n          <a data-toggle=\"dropdown\" href=\"#\">Bar Chart <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n              <li><a href=\"#\">Var 1</a></li>\n              <li><a href=\"#\">Var 2</a></li>\n              <li><a href=\"#\">Var 3</a></li>\n              <li><a href=\"#\">Var 4</a></li>\n              <li><a href=\"#\">Var 5</a></li>\n            </ul>\n        </li>\n        <li>\n          <a data-toggle=\"dropdown\" href=\"#\">Line Chart <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n              <li><a href=\"#\">Var 1</a></li>\n              <li><a href=\"#\">Var 2</a></li>\n              <li><a href=\"#\">Var 3</a></li>\n              <li><a href=\"#\">Var 4</a></li>\n              <li><a href=\"#\">Var 5</a></li>\n            </ul>\n        </li>\n        <li>\n          <a data-toggle=\"dropdown\" href=\"#\">Map <b class=\"caret\"></b></a>\n            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n              <li><a href=\"#\">Var 1</a></li>\n              <li><a href=\"#\">Var 2</a></li>\n              <li><a href=\"#\">Var 3</a></li>\n              <li><a href=\"#\">Var 4</a></li>\n              <li><a href=\"#\">Var 5</a></li>\n            </ul>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n  <div class=\"chart col-xs-12\"></div>\n</div>";
  },"useData":true}));

Handlebars.registerPartial("header", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header>\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <span class=\"navbar-brand\">Wisconsin Portal - HighCharts</span>\n    </div>\n\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"navbarCollapse\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\">Home</a></li>\n        <li class=\"active\"><a href=\"#\">Data</a></li>\n        <li><a href=\"#\">About</a></li>\n        <li><a href=\"#\">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class=\"jumbotron\">\n  <img class=\"img-responsive\" src=\"images/logo.png\" alt=\"\">\n</div>";
  },"useData":true}));

Handlebars.registerPartial("linechart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12 chart\"></div>";
  },"useData":true}));

Handlebars.registerPartial("table", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\n\n  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n\n    <div class=\"panel panel-default\">\n      <div data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\n      aria-controls=\"collapseOne\"class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n        <h4 class=\"panel-title pull-left\">Data Table</h4>\n        <span id=\"minusIcon\" class=\"glyphicon glyphicon-minus pull-right\"></span>\n        <span id=\"plusIcon\" class=\"glyphicon glyphicon-plus pull-right\"></span>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n        <div class=\"panel-body\">\n          <table id=\"myTable\" class=\"table table-striped table-responsive\">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n</div>";
  },"useData":true}));

this["templates"] = this["templates"] || {};

this["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <hr>\n\n  <h1>\n    <span clas=\"pull-left\">Hello, world - from Highcharts / Highmaps</span>\n    <button id=\"randomData\" class=\"btn btn-default pull-right\">Randomize the Data!</button>\n  </h1>\n\n  <div class=\"clearfix\"></div>\n\n  <div class=\"col-xs-12\">\n    <h3>\n      Number of Charts:\n      <div class=\"btn-group\" data-toggle=\"buttons\">\n        <label id=\"on\" class=\"btn btn-default\">\n          <input type=\"radio\" name=\"numcharts\" autocomplete=\"off\" value=\"1\">1 Chart\n        </label>\n        <label id=\"off\" class=\"btn btn-default active\">\n          <input type=\"radio\" name=\"numcharts\" autocomplete=\"off\" value=\"2\" checked>2 Charts\n        </label>\n      </div>\n    </h3>\n  </div>\n\n";
  stack1 = this.invokePartial(partials.halfChart, '  ', 'halfChart', depth0, {
    'id': ("chart999")
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = this.invokePartial(partials.halfChart, '  ', 'halfChart', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <div class=\"clearfix\"></div>\n\n  <div class=\"btn-group\" data-toggle=\"buttons\">\n    <label id=\"on\" class=\"btn btn-default\">\n      <input type=\"radio\" name=\"errorbar\" autocomplete=\"off\" value=\"true\">Show Errorbars\n    </label>\n    <label id=\"off\" class=\"btn btn-default active\">\n      <input type=\"radio\" name=\"errorbar\" autocomplete=\"off\" value=\"false\" checked>Hide Errorbars\n    </label>\n  </div>\n\n";
  stack1 = this.invokePartial(partials.linechart, '  ', 'linechart', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <hr>\n\n";
  stack1 = this.invokePartial(partials.table, '  ', 'table', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"usePartial":true,"useData":true});