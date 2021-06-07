const {
	MODE, // 'development' or 'production'
	PATHS
} = require('./gulpfile.config');
const { src, dest, parallel } = require('gulp');
const gulpIf = require('gulp-if');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
// const unhandledError = require("cli-handle-unhandled");

// Minifies all the CSS files within ./assets/css folder
function minifycss() {
	return src(PATHS.assets.css + '/*.css', {
		ignore: PATHS.assets.css + '/*.min.css',
		sourcemaps: true
	})
		.pipe(
			gulpIf(MODE == 'development', sourceMaps.init({ loadMaps: true }))
		)
		.pipe(cleanCSS({ compatibility: '*', debug: true }))
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(gulpIf(MODE == 'development', sourceMaps.write('./maps')))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(PATHS.assets.css));
}

// Minifies JS files within ./assets/js folder
function minifyjs() {
	return src(PATHS.assets.js + '/*.js', {
		ignore: PATHS.assets.js + '/*.min.js'
	})
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(
			gulpIf(MODE == 'development', sourceMaps.init({ loadMaps: true }))
		)
		.pipe(
			terser({
				mangle: {
					toplevel: true
				}
			})
		)
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulpIf(MODE == 'development', sourceMaps.write('./maps')))
		.pipe(dest(PATHS.assets.js));
}

const minify = parallel(minifycss, minifyjs);

module.exports = { minify };
