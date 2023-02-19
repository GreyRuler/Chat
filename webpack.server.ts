import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
	devtool: 'source-map',
	entry: {
		server: './src/backend/index.ts'
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader'
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: 'dist/'
						}
					}
				]
			}
		]
	},

	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist/backend')
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},
	target: 'node'
};

export default config;
