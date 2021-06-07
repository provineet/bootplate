const { PATHS } = require('./gulpfile.config');
const { src, dest } = require('gulp');
const imageMin = require('gulp-imagemin');

// Running image optimizing task
function imagemin() {
	return src(PATHS.src.images + '/**')
		.pipe(
			imageMin(
				[
					imageMin.gifsicle({ interlaced: true }),
					imageMin.mozjpeg({ quality: 75 }),
					imageMin.optipng({ optimizationLevel: 5 }),
					imageMin.svgo({
						plugins: [
							{ removeViewBox: true },
							{ cleanupIDs: false }
						]
					})
				],
				{
					verbose: true // uncomment to see the output of compression stats in the console
				}
			)
		)
		.pipe(dest(PATHS.assets.images));
}

module.exports = { imagemin };
