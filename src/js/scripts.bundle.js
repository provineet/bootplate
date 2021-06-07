// Our project's custom script will go here...
//
// This file is bundled by webpack, we can configure webpack.config.json for more features, if required
//
// We can import packages from npm
// example: import React { Component } from 'react';
//
// Import from our local modules folder

import bootflow from "./modules/example-module.js";

(function ($) {
  bootflow.run($);
})(jQuery);
