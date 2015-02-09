Handlebars.registerPartial("dropdown", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<nav role=\"navigation\" class=\"navbar navbar-default chartSelect\">\n\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class=\"navbar-header\">\n    <button type=\"button\" data-target=\"#dataCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n      <span class=\"sr-only\">Toggle navigation</span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n    <span class=\"navbar-brand\">Options</span>\n  </div>\n\n\n  <div class=\"clearfix\"></div>\n\n  <!-- Collection of nav links and other content for toggling -->\n  <div id=\"dataCollapse\" class=\"collapse navbar-collapse\">\n    <form>\n\n      <div class=\"form-group nav-select col-sm-3\">\n        <label class=\"control-label\">Factor</label>\n        <select disabled class=\"form-control dropDownA\">\n        </select>\n      </div>\n\n      <div class=\"form-group nav-select col-sm-2\">\n        <label class=\"control-label\">Year</label>\n        <select disabled class=\"form-control dropDownB\">\n        </select>\n      </div>\n\n      <div class=\"form-group nav-select col-sm-3\">\n        <label class=\"control-label\">Map Detail</label>\n        <select disabled class=\"form-control dropDownC\">\n        </select>\n      </div>\n\n      <div class=\"form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0\">\n        <label class=\"control-label\">Errorbars</label>\n        <br>\n        <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"errorbar\">\n      </div>\n\n      <div class=\"form-group nav-select col-xs-offset-2 col-xs-2 col-sm-offset-0\">\n        <label class=\"control-label\">Large&nbsp;Charts</label>\n        <br>\n        <input class=\"bootstrapSwitch\" type=\"checkbox\" name=\"largecharts\">\n      </div>\n\n    </form>\n  </div>\n\n\n</nav>\n";
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
    + "\" class=\"col-xs-12 col-md-6 chartContainer smallChart\">\n  <div id=\"chart"
    + escapeExpression(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"num","hash":{},"data":data}) : helper)))
    + "\" class=\"chart col-xs-12\"></div>\n\n";
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
  return buffer + "\"><a href=\"#contact\">Contact</a></li>\n      </ul>\n    </div>\n  </nav>\n</header>\n\n<div class=\"jumbotron\">\n  <img class=\"img-responsive\" src=\"images/logo.png\" alt=\"\">\n</div>\n";
},"useData":true}));

Handlebars.registerPartial("linechart", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"chart lineChart col-xs-12\"></div>";
  },"useData":true}));

Handlebars.registerPartial("table", Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\n\n  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n\n    <div class=\"panel panel-default\">\n      <div data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\"\n      aria-controls=\"collapseOne\"class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n        <h4 class=\"panel-title pull-left\">Data Table</h4>\n        <span id=\"minusIcon\" class=\"glyphicon glyphicon-minus pull-right\"></span>\n        <span id=\"plusIcon\" class=\"glyphicon glyphicon-plus pull-right\"></span>\n        <div class=\"clearfix\"></div>\n      </div>\n      <div id=\"collapseOne\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n        <div class=\"panel-body\">\n          <table id=\"myTable\" class=\"table table-striped table-responsive\">\n            <thead>\n              <tr>\n                <th>Index</th>\n                <th>County Name</th>\n                <th>Region</th>\n                <th>Data</th>\n                <th>HighCharts Id</th>\n              </tr>\n            </thead>\n\n            <tbody>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>";
  },"useData":true}));

this["templates"] = this["templates"] || {};

this["templates"]["about"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_about': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>About Us</h1>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});



this["templates"]["charts"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_charts': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = this.invokePartial(partials.dropdown, '  ', 'dropdown', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h2 id=\"val\">Selected Value: No region selected</h2>\n\n  <div class=\"row\">\n";
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



this["templates"]["contact"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_contact': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Contact Us</h1>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});



this["templates"]["data"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_data': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Data</h1>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});



this["templates"]["index"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"container\">\n\n";
  stack1 = this.invokePartial(partials.header, '  ', 'header', depth0, {
    'active_home': (true)
  }, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <h1>Welcome to SHOW</h1>\n\n";
  stack1 = this.invokePartial(partials.footer, '  ', 'footer', depth0, undefined, helpers, partials, data);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"usePartial":true,"useData":true});