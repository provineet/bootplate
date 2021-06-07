const { PATHS, cssSprites } = require('./gulpfile.config');
const { src, dest } = require('gulp');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');

// Run: gulp sprites
// Creates CSS Sprite Image & SCSS file
function sprites() {
	var spriteOptions = {
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgPath: PATHS.src.images + '/sprite.png',
		algorithm: 'binary-tree' //For options: https://www.npmjs.com/package/spritesmith#algorithms
	};

	//   if true then stripe_images folder should contain equal number of perfectly sized @2x images as well.
	if (cssSprites.retina === true) {
		spriteOptions = {
			...spriteOptions,
			retinaSrcFilter: PATHS.src.sprites + '/*@2x.png',
			retinaImgName: 'sprite@2x.png',
			retinaImgPath: PATHS.src.images + '/sprite@2x.png'
		};
	}

	var spriteData = src(PATHS.src.sprites + '/*.png').pipe(
		spritesmith(spriteOptions)
	);

	var imgStream = spriteData.img.pipe(buffer()).pipe(dest(PATHS.src.images));

	// Pipe CSS stream through CSS optimizer and onto disk
	var cssStream = spriteData.css.pipe(dest(PATHS.src.scss + '/components/'));

	// Return a merged stream to handle both `end` events
	return merge(imgStream, cssStream);
}

module.exports = { sprites };
