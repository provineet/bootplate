const { browserSyncOptions } = require('./gulpfile.config');

const browserSync = require('browser-sync').create();

// Run: gulp browsersync
// Starts browser-sync task for starting the server.
function browsersync(done) {
	browserSync.init({}, browserSyncOptions);
	done();
}

function reloadBrowser(done) {
	browserSync.reload();
	done();
}

module.exports = { browsersync, reloadBrowser };
