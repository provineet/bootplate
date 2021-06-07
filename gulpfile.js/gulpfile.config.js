module.exports = {
	// development | production
	MODE: 'development',
	// compress CSS & Js files?
	COMPRESSION: true,
	// "concat | webpack"
	JSBUILD: 'concat',
	browserSyncOptions: {
		server: {
			baseDir: './',
			notify: false
		}
	},
	watchFiles: {
		html: true,
		scss: true,
		js: true,
		images: true,
		sprites: true,
		assetsCSS: false,
		assetsJs: false,
		assetsImg: false
	},
	cssSprites: {
		retina: false,
		algorithm: 'binary-tree'
	},
	PATHS: {
		root: '/',
		assets: {
			folder: './assets',
			css: './assets/css',
			js: './assets/js',
			fonts: './assets/webfonts',
			images: './assets/images'
		},
		src: {
			folder: './src',
			scss: './src/scss',
			js: './src/js',
			images: './src/images',
			fonts: './src/webfonts',
			sprites: './src/sprites'
		},
		dist: './dist',
		devdist: './dev-dist',
		node: './node_modules/'
	},
	distIgnore: [
		'.*',
		'.**/*',
		'./node_modules/**',
		'./src/**',
		'./assets/**/maps/**',
		'./assets/**/maps/**/*.map',
		'readme.md',
		'package.json',
		'package-lock.json',
		'CHANGELOG.md',
		'./gulpfile.js/**',
		'LICENSE',
		'./dist/**',
		'./dev-dist/**'
	],
	devDistIgnore: [
		'./node_modules/**',
		'./dist/**',
		'./dev-dist/**',
		'./.vscode/**',
		'./.git/**'
	]
};
