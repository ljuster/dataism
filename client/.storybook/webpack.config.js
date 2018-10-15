const path = require('path');
const webpack = require('webpack');
const _ = require('lodash/fp');
const sassResources = require('../webpack/sassResources');

module.exports = {
  entry: { app: ['bootstrap-loader'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: { resources: sassResources },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.global\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: { resources: sassResources },
          },
        ],
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg|jpe?g|png|gif|ico|otf)$/,
        use: 'url-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    // HACK: see https://stackoverflow.com/questions/41745082/cannot-resolve-velocity-react-because-of-lodash-dependencies-not-being-found
    alias: {
      'lodash/object/omit': 'lodash/omit',
      'lodash/object/extend': 'lodash/extend',
      'lodash/lang/isObject': 'lodash/isObject',
      'lodash/lang/isEqual': 'lodash/isEqual',
      'lodash/collection/forEach': 'lodash/forEach',
      'lodash/collection/each': 'lodash/each',
      'lodash/collection/pluck': 'lodash/map',
      'lodash/object/keys': 'lodash/keys',
    },
    modules: [
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '..', 'app'),
      path.resolve(__dirname, '..', 'node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};