var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  },

  output: {
      path: path.resolve('./assets/bundles/'),
      filename: '[name]-[hash].js',
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['$'],
        screw_ie8 : true,
        keep_fnames: false,
      }
    }),
    new ExtractTextPlugin('public/style.css', {
      allChunks: true
    }),
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets:['es2015', 'react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass', ExtractTextPlugin.extract('css!sass')]
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
