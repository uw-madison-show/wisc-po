// JSHint options:
/* global $, Handlebars, App */
'use strict';

/* Helpers for Handlebars templating */

/**
* @namespace App.helpers
*/
App.helpers = {};

/**
 * Sets up the handlebars templates for select box options which display counties
 * and indicators.
 * Found At: {@link http://htmlr.tumblr.com/post/33202449716/}
 * @example Usage: <select><option>Please select</option>{{renderCountryOpts "Australia"}}</select>
 * @method helperSetup
 * @memberof App.helpers
 * @return {Void}
 */
App.helpers.helperSetup = function() {
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

    for (var key in App.maps.regionDictionary) {
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
};
