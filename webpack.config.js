const {resolve} = require('path');
//const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {merge} = require('webpack-merge');

const config = {
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', {}], '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css?$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}

const devConfig = {
	entry: resolve(__dirname, 'src/browser'),
	plugins: [new HtmlWebpackPlugin()],
}

const prodConfig = {
	entry: {
		module: resolve(__dirname, 'src/module'),
		browser: resolve(__dirname, 'src/browser'),
		Component: resolve(__dirname, 'src/Component')
	},
	//externalsPresets: {node: true}, // in order to ignore built-in modules like path, fs, etc.
	//externals: [nodeExternals()],
	output: {
		filename: '[name].js',
		library: {
			name: 'insaltApp',
			type: 'umd',
			export: 'default',
		},
		assetModuleFilename: '[name][ext][query]',
	},
	plugins: [new HtmlWebpackPlugin({
		chunks : ['browser'],
	})],
}

module.exports = ({WEBPACK_SERVE}) => merge(config, WEBPACK_SERVE ? devConfig : prodConfig);