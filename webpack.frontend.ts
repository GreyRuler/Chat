import * as path from 'path';
import { Configuration } from 'webpack';

import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

interface ExtendedConfiguration extends Configuration {
	devServer: {
		port: number;
	};
}

const config: ExtendedConfiguration = {
	devServer: {
		port: 9000
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	entry: './src/frontend/index.ts',
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader'
				}
			},
			{
				test: /\.(png|jpg|gif)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/frontend/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],
	resolve: {
		extensions: ['.ts', '.js', '.json']
	}
};

export default config;
