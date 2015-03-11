// JSHint options:
/* global $, Handlebars, App, regionDictionary */
/* exported helperSetup */
'use strict';

/* Helpers for Handlebars templating */

/*
Renders select box options for countries and sets selected based on value
Usage: <select><option>Please select</option>{{renderCountryOpts "Australia"}}</select>
Found At: http://htmlr.tumblr.com/post/33202449716/
*/
function helperSetup() {
  Handlebars.registerHelper('dropDownIndicators', function(selected) {
    var ret;

    $.each(App.dropDownIndicators, function() {
      var selectedVal = '';
      if(this[0] === selected){
        selectedVal = 'selected';
      }
      ret+='<option '+selectedVal+' value="'+this[0]+'" data-variable="' + this[1] + '">'+this[0]+'</option>';
    });

    return new Handlebars.SafeString(ret);
  });

  Handlebars.registerHelper('dropDownCounty', function(selected) {
    var county = [];
    county.push('All Counties');

    for (var key in regionDictionary) {
      county.push(key);
    }

    var ret = '';
    $.each(county, function() {
      var selectedVal = '';
      if (this === selected) {
        selectedVal = 'selected';
      }
      ret+='<option '+selectedVal+' value="'+this+'">'+this+'</option>';
    });

    return new Handlebars.SafeString(ret);
  });
}
