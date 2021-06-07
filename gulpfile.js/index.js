const { series, parallel } = require('gulp');

// Importing Tasks
const { scss } = require('./scss');
const { browsersync } = require('./browsersync');
const { minify } = require('./minify');
const { scripts } = require('./scripts');
const { imagemin } = require('./imagemin');
const { sprites } = require('./sprites');
const { copyassets, fonts } = require('./copyassets');
const { watch } = require('./watch');

const { build, devbuild } = require('./createdist');

// Serves website on localhost and watch for changes
// Compiles SCSS, JS, Optimize Images, Create Sprite Images and SCSS
// Create a dev server using browserSync and serve it on localhost
// To change your proxy address edit gulpconfig.json
const serve = series(
	parallel(scss, fonts, scripts, imagemin, sprites),
	browsersync,
	watch
);

module.exports = {
	serve,
	build,
	devbuild,
	copyassets,
	minify,
	scss,
	scripts
};
