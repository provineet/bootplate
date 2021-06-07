"use strict";

/**
 * JS FILE ONE
 *
 * @param   NULL  function  NULL
 *
 * @return  Void  Returns nothing
 */
(function ($) {
  $(function () {
    console.log("Script-1 File");
  });
})(jQuery);

(function ($) {
  $(function () {
    console.log("Script-2 File");
  });
})(jQuery); // ES6 Arrow function


var arrowFunction = function arrowFunction() {
  console.log("This Arrow Function will be transpiled by Babel.");
};
//# sourceMappingURL=maps/scripts.js.map