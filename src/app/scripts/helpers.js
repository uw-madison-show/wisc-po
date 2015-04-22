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
 * @example
 * <!-- Usage -->
 * <select>
 *   <option>Please select</option>
 *   {{renderCountryOpts "Australia"}}
 * </select>
 * @method helperSetup
 * @memberof App.helpers
 * @return {Void}
 */
App.helpers.helperSetup = function() {
  Handlebars.registerHelper('dropDownTags', function(selected) {
    var ret;
    var tags = Object.keys(App.dropDownTags);

    console.log(selected);

    tags.sort();

    $.each(tags, function() {
      var selectedVal = '';
      if(this === selected) {
        selectedVal = 'selected';
      }
      ret+='<option '+selectedVal+' value="'+this+'">'+this+'</option>';
    });

    return new Handlebars.SafeString(ret);
  });

  Handlebars.registerHelper('dropDownTagsIndicators', function(current, selected) {
    var ret;
    var tag = $('.dropDownTags option:selected').text() || Object.keys(App.dropDownTags)[0];

    var indicators = [];
    for (var ind in App.dropDownTags[tag]) {
      indicators.push([ind, App.dropDownTags[tag][ind]]);
    }
    indicators.sort(function(a, b) {
      return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
    });

    $.each(indicators, function() {
      var selectedVal = '';
      if(this === selected) {
        selectedVal = 'selected';
      }

      ret+='<option '+selectedVal+' value="'+this[0]+'">'+this[1]+'</option>';
    });

    return new Handlebars.SafeString(ret);
  });

  Handlebars.registerHelper('dropDownIndicators', function() {
    return new Handlebars.SafeString(Handlebars.helpers.dropDownTagsIndicators('All'));
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
