const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const mode = "development";
const sourcemap = mode === "development";
const DeployPlugin = require('./commands/deployPlugin').module;
const plugins = [
	new CleanWebpackPlugin({
		cleanStaleWebpackAssets: false
	}),
	new CopyWebpackPlugin([
		{
			from: "./src/okr-hub.html",
			to: "./"
		}
	]),
	new DeployPlugin()
];

module.exports = {
	entry: {
		OKRHub: './src/OKRHub.tsx'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: "[name]"
	},
	devtool: "source-map",
	mode: mode,
	stats: {
		all: false,
		builtAt: true,
		cached: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: "ts-loader"
				}]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				use: [{
					loader: "source-map-loader"
				}]
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader',
					options: {
						sourcemap: sourcemap
					}
				}, {
					loader: 'css-loader',
					options: {
						sourcemap: sourcemap
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourcemap: sourcemap
					}
				}]
			},
			{
				test: /\.(scss)$/,

				use: [{
						loader: 'style-loader',
						options: {
							sourcemap: sourcemap
						}
					}, {
						loader: 'css-loader',
						options: {
							sourcemap: sourcemap
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourcemap: sourcemap
						}
					}
				]
			},
			{
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
		]
	},

	plugins: plugins
};