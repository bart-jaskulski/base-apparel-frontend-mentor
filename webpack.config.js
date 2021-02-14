const path = require('path');
const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CopyPlugin = require( "copy-webpack-plugin" );
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: process.cwd(),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [ 'babel-loader' ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader?url=false',
          'postcss-loader',
        ],
      },
      // Images to copy.
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				loader: 'assets/resource'
			},
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin( {
      filename: '[name].css'
    } ),

    // new CleanWebpackPlugin(),

    // Copy files from target to destination.
		new CopyPlugin( {
			patterns: [
				{
					from: 'img',
					to: 'img'
				}
			]
		} ),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/template.html'),
      filename: 'index.html',
      minify: false,
      meta: true,
    }),

  ],
  watchOptions: {
    ignored: '**/node_modules',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: 'firefox-developer-edition',
    compress: true,
    hot: true,
    port: 8080,
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     `...`,
  //     new CssMinimizerPlugin(),
  //   ],
  // },
  // performance: {
  //   hints: false,
  // }
};
