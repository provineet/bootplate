const {
	PATHS,
	distIgnore, // Files to be ignored while building the dist folder
	devDistIgnore // Files to be ignored while building the devdist folder
} = require('./gulpfile.config');

const { src, dest, series } = require('gulp');
const del = require('del');
const nodePath = require('path');
const zip = require('gulp-zip');

// remove the dist folder
function cleandist() {
	return del([PATHS.dist]);
}

// remove the dev-dist folder
function cleandevdist() {
	return del([PATHS.devdist]);
}

// Create a dist folder
function createDist(distFolder, ignoreFiles) {
	const themeName = nodePath
		.resolve(__dirname, '..')
		.split(nodePath.sep)
		.pop();
	return src(['**/*', '*'], {
		ignore: ignoreFiles,
		buffer: true,
		dot: true
	})
		.pipe(dest(`${distFolder}/${themeName}`))
		.pipe(zip(`${themeName}.zip`))
		.pipe(dest(distFolder));
}

// Create a production dist
function dist() {
	return createDist(PATHS.dist, distIgnore);
}

// Create a development dist
function devdist() {
	return createDist(PATHS.devdist, devDistIgnore);
}

// Build a production dist
const build = series(cleandist, dist);

// Build a dist for development
const devbuild = series(cleandevdist, devdist);

module.exports = { build, devbuild };
