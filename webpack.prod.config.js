const webpack = require('webpack');
const config = require('./webpack.base.js');

config.plugins = config.plugins.concat([
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
]);

module.exports = config;
