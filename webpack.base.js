const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    profile: [
      './assets/js/profile/index',
    ],
    hero: [
      './assets/css/styles.scss',
    ],
  },

  output: {
    path: path.resolve('./assets/bundles/'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new BundleTracker({ filename: './webpack-stats.json', }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name]-[hash].js',
      minChunks: 2,
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
  ],

  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/, ],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { 'modules': false }],
            'react',
            'flow',

          ],
          plugins: [
            ['transform-class-properties', { spec: true, }, ],
            ['transform-object-rest-spread'],
          ],
        },
      }, {
        test: [/\.css$/, /\.scss$/, ],
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }, ],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'bower_components', ],
    extensions: ['.js', '.jsx', ],
  },
};
