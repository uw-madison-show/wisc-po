/*
Renders select box options for countries and sets selected based on value
Usage: <select><option>Please select</option>{{renderCountryOpts "Australia"}}</select>
Found At: http://htmlr.tumblr.com/post/33202449716/
*/

function helperSetup() {
  Handlebars.registerHelper('dropDownIndicators', function(selected) {
    var ret;

    // for (var i=0; i < dropDownOptsA.length; i++){
    //   var selectedVal = "";
    //
    //   if(dropDownOptsA[i] === selected){
    //     selectedVal = "selected";
    //   }
    //   ret+="<option "+selectedVal+" value='"+dropDownOptsA[i]+"'>"+dropDownOptsA[i]+"</option>";
    // }

    $.each(dropDownIndicators, function() {
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
    for (var key in regionDictionary) {
      county.push(key);
    }

    var ret = "";
    for (var i=0; i < county.length; i++){
      var selectedVal = '';
      if(county[i] === selected){
        selectedVal = 'selected';
      }
      ret+='<option '+selectedVal+' value="'+county[i]+'">'+county[i]+'</option>';
    }
    return new Handlebars.SafeString(ret);

  });
}
