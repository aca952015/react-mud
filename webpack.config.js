'use strict';

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  inject: 'body'
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  entry: `${__dirname}/app/entry.jsx`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin('bundle.css')
  ]
};
