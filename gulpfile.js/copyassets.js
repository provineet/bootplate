const { PATHS } = require('./gulpfile.config');

const { src, dest } = require('gulp');

// Copies jQuery, Bootstrap & FontAwesome5 files node_modules to src folders
function copyassets() {
	// Copy Slim Minified version of Jquery 3.*.* from node_modules
	var stream = src(PATHS.node + 'jquery/dist/*.js').pipe(
		dest(PATHS.src.js + '/vendors/jquery')
	);

	// Copy BS4 JS files
	src(PATHS.node + 'bootstrap/dist/js/**/*.js').pipe(
		dest(PATHS.src.js + '/vendors/bootstrap')
	);

	// Copy BS4 SCSS files
	src(PATHS.node + 'bootstrap/scss/**/*.scss').pipe(
		dest(PATHS.src.scss + '/vendors/bootstrap')
	);

	// Copy all Font Awesome Fonts
	src(
		PATHS.node +
			'@fortawesome/fontawesome-free/webfonts/*.{ttf,woff,woff2,eot,svg}'
	).pipe(dest(PATHS.src.fonts));

	// Copy all FontAwesome5 Free SCSS files
	src(PATHS.node + '@fortawesome/fontawesome-free/scss/*.scss').pipe(
		dest(PATHS.src.scss + '/vendors/fontawesome')
	);

	return stream;
}

// Copies font src to assets folder
function fonts() {
	return src(PATHS.src.fonts + '/**/*').pipe(dest(PATHS.assets.fonts));
}

module.exports = { copyassets, fonts };
