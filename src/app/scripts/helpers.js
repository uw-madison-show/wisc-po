/*
Renders select box options for countries and sets selected based on value
Usage: <select><option>Please select</option>{{renderCountryOpts "Australia"}}</select>
*/

function dropDownASetup() {
  Handlebars.registerHelper('dropDownA', function(selected) {
    var ret = "";
    for (var i=0; i < dropDownOptsA.length; i++){
      var selectedVal = "";
      if(typeof(selected) == "string" && dropDownOptsA[i] === selected.toUpperCase()){
        selectedVal = "selected";
      }
      ret+="<option "+selectedVal+" value='"+dropDownOptsA[i]+"'>"+dropDownOptsA[i]+"</option>";
    }
    return new Handlebars.SafeString(ret);

  });
}
