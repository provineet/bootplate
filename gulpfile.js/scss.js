const {
	MODE, // 'development' or 'production'
	COMPRESSION, // true | false : compresses css and js files while compiling them
	PATHS
} = require('./gulpfile.config');

const { src, dest, parallel } = require('gulp');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Complies assets_src/scss/vendors.scss
function vendorscss() {
	return processScss(`${PATHS.src.scss}/vendors.scss`, { sourcemaps: true });
}

// Compiles assets_src/scss/style.scss
function themescss() {
	return processScss(`${PATHS.src.scss}/style.scss`, { sourcemaps: true });
}

function processScss(source, srcObj = {}) {
	return src(source, srcObj)
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(sass({ errLogToConsole: true }))
		.pipe(
			autoPrefixer({
				env: MODE,
				grid: 'autoplace' // should Autoprefixer add IE 10-11 prefixes for Grid Layout properties? false | autoplace | no-autoplace
			})
		)
		.pipe(
			gulpIf(
				COMPRESSION,
				dest(PATHS.assets.css),
				dest(PATHS.assets.css, { sourcemaps: './maps' })
			)
		)
		.pipe(
			gulpIf(COMPRESSION, cleanCSS({ compatibility: '*', debug: true }))
		)
		.pipe(
			plumber({
				errorHandler: function (err) {
					console.log(err);
					this.emit('end');
				}
			})
		)
		.pipe(gulpIf(COMPRESSION, rename({ suffix: '.min' })))
		.pipe(
			gulpIf(
				COMPRESSION,
				dest(PATHS.assets.css, { sourcemaps: './maps' })
			)
		);
}

const scss = parallel(themescss, vendorscss);

module.exports = { scss, vendorscss, themescss };
