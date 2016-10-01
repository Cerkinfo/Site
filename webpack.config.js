var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: {
    events: [
      './assets/js/event/index',
    ],
    spaceapi: [
      './assets/js/spaceapi/index',
    ],
  },

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: '[name]-[hash].js',
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets:['react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.json$/,
        loader: 'json'        
      },
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
};
