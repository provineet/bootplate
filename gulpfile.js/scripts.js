const {
	MODE, // 'development' or 'production'
	COMPRESSION, // true | false : compresses css and js files while compiling them
	PATHS,
	JSBUILD
} = require('./gulpfile.config');

const { src, dest, parallel } = require('gulp');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');

// JSBUILD:"webpack" modules
const named = require('vinyl-named');
const webpackCompiler = require('webpack');
const webpack = require('webpack-stream');
// Workaround for webpack.config.js for multicomplier support
const webpackConfig = require('./webpack.config');

// JSBUILD:"concat" modules
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const gulpIgnore = require('gulp-ignore');

// const unhandledError = require("cli-handle-unhandled");

// COPIES JS FROM /src/vendors to assets/js
// Creates a concatenated vendors.js file for production mode i.e. if MODE_DEV is false.
function vendorjs() {
	var scripts = [
		// Order of dependencies matter in DEV_MOD: false.
		// All the vendors scripts will be concatenated in single vendors.js file in production mode.
		// jQuery
		PATHS.src.js + '/vendors/jquery/jquery.slim.min.js',
		// Bootstrap JS
		PATHS.src.js + '/vendors/bootstrap/bootstrap.bundle.min.js',
		// Root Files in the vendors folder are automatically picked and processed
		PATHS.src.js + '/vendors/*.js'
	];

	return src(scripts)
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(gulpIf(MODE == 'production', concat('vendors.js')))
		.pipe(dest(PATHS.assets.js));
}

// Build custom theme scripts without bundling
// Simply Concatenates all the .js files within src/js/scripts/* folder and src/js/scripts.js
function concatScripts() {
	return src([PATHS.src.js + '/scripts/*.js', PATHS.src.js + '/scripts.js'], {
		sourcemaps: true
	})
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(concat('scripts.js'))
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(dest(PATHS.assets.js, { sourcemaps: './maps' }))
		.pipe(gulpIgnore.exclude(file => /map?$/.test(file.path)))
		.pipe(
			gulpIf(
				COMPRESSION,
				terser({
					mangle: {
						toplevel: true
					}
				})
			)
		)
		.pipe(gulpIf(COMPRESSION, rename({ suffix: '.min' })))
		.pipe(
			gulpIf(COMPRESSION, dest(PATHS.assets.js, { sourcemaps: './maps' }))
		);
}

// creates script.bundle for custom theme scripts
// build /src/js/scripts.bundle.js file via Webpack
function scriptsBundle() {
	return src(PATHS.src.js + '/scripts.bundle.js')
		.pipe(named())
		.pipe(
			webpack(webpackConfig, webpackCompiler, function (err, stats) {
				console.log(err);
			})
		)
		.pipe(rename({ basename: 'scripts.bundle', suffix: '.min' }))
		.pipe(dest(PATHS.assets.js));
}

function themescripts() {
	if (JSBUILD == 'webpack') {
		return scriptsBundle();
	} else {
		return concatScripts();
	}
}

const scripts = parallel(themescripts, vendorjs);

module.exports = { vendorjs, themescripts, scripts };
