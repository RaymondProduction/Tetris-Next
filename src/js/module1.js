
define(
  //The name of this module
  "module1",

  //The array of dependencies
  [],

  function() {
    var moduleObj = {};
    debugger;

    moduleObj.add = function(a, b) {
      return a + b;
    }

    return moduleObj;
  }
);
