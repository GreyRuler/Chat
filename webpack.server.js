const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'server'),
	},
	entry: './src/backend/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-modules-commonjs'],
					},
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
};
