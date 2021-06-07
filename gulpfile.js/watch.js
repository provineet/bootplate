const { PATHS, watchFiles } = require('./gulpfile.config');

const { watch: gulpWatch, series } = require('gulp');

const { reloadBrowser } = require('./browsersync');

const { themescss, vendorscss } = require('./scss');
const { vendorjs, themescripts } = require('./scripts');
const { imagemin } = require('./imagemin');
const { sprites } = require('./sprites');
// const unhandledError = require("cli-handle-unhandled");

function watchSCSS() {
	// Watches for SCSS file changes
	if (watchFiles.scss == true) {
		gulpWatch(
			[
				PATHS.src.scss + '/vendors/**/*.scss',
				PATHS.src.scss + '/vendors.scss',
				PATHS.src.scss + '/abstract/_variables.scss'
			],
			series(vendorscss, reloadBrowser)
		);

		gulpWatch(
			PATHS.src.scss + '/**/*.scss',
			{
				ignored: [
					PATHS.src.scss + '/vendors/**/*.scss',
					PATHS.src.scss + '/vendors.scss'
				]
			},
			series(themescss, reloadBrowser)
		);
	}
}

function watchJS() {
	// Watches for JS file changes inside ./src
	if (watchFiles.js == true) {
		gulpWatch(
			PATHS.src.js + '/vendors/**/*.js',
			series(vendorjs, reloadBrowser)
		);
		gulpWatch(
			[
				`${PATHS.src.js}/scripts/*.js`,
				`${PATHS.src.js}/scripts.js`,
				`${PATHS.src.js}/modules/*.js`,
				`${PATHS.src.js}/scripts.modules.js`
			],
			series(themescripts, reloadBrowser)
		);
	}
}

function watchImg() {
	// Watches for Images file changes inside ./src
	if (watchFiles.images == true) {
		gulpWatch(PATHS.src.images + '/*', series(imagemin, reloadBrowser));
	}

	// Watches for sprite_images folder changes inside ./src
	// Sprite generation will in-turn call SCSS and Images watcher and hence reload the browser as a side-effect
	if (watchFiles.sprites == true) {
		gulpWatch(PATHS.src.sprites + '/*', series(sprites));
	}
}

function watchAssetsFolder() {
	// Watches for CSS file changes inside ./assets
	if (watchFiles.assetsCss == true) {
		gulpWatch(PATHS.assets.css + '/**/*.css', series(reloadBrowser));
	}

	// Watches for JS file changes inside ./assets
	if (watchFiles.assetsJs == true) {
		gulpWatch(PATHS.assets.js + '/**/*.js', series(reloadBrowser));
	}
}

function watchHTML() {
	// Watches for PHP files changes
	if (watchFiles.html == true) {
		gulpWatch(
			'**/*.html',
			{ ignored: ['./node_modules/**/*.html'] },
			series(reloadBrowser)
		);
	}
}

// Watches for changes in style.scss, _template_variables.scss, *js files and images within src folder
function watch() {
	watchSCSS();

	watchJS();

	watchImg();

	watchAssetsFolder();

	watchHTML();
}

module.exports = { watch };
