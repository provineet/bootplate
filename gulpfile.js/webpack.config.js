const webpack = require('webpack');
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'production',
	devtool: false,
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: './maps/[name].min.map'
		})
	]
	//   optimization: {
	//     minimizer: [
	//       new TerserPlugin({
	//         terserOptions: {
	//           format: {
	//             comments: false,
	//           },
	//         },
	//         extractComments: true,
	//       }),
	//     ],
	//   },
};
