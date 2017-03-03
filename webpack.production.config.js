var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,

  entry: {
    events: [
      './assets/js/event/index',
    ],
    spaceapi: [
      './assets/js/spaceapi/index',
    ],
    barcode: [
      './assets/js/barcode_render/index',
    ],
    buy_form: [
      './assets/js/buy_form/index',
    ],
    add_form: [
      './assets/js/add_form/index',
    ],
    products: [
      './assets/js/products/index',
    ],
    markdown_page: [
      './assets/js/markdown_page/index',
    ],
  },

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: '[name]-[hash].js',
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "[name]-[hash].js",
      minChunks: 2,
    }),
    new ExtractTextPlugin("[name]-[hash].css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
    }),
  ],

  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets:[
            ['es2015', {modules: false}], 
            'react'
          ],
        },
      }, {
        test: [/\.css$/, /\.scss$/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.json$/,
        loader: 'json-loader'        
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
  },
};
