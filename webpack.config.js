const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './'),
	entry: {
		index: [
			'./index.js'
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].bundle.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{loader: 'css-loader', options: {url: true}}
				]
			},
			{
				test: /\.html$/i,
				use: 'raw-loader',
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 9000
	}
};