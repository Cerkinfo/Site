const webpack = require('webpack');
const config = require('./webpack.base.js');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

config.plugins = config.plugins.concat([
  new PrepackWebpackPlugin({}),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
]);

module.exports = config;
