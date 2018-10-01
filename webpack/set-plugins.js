const _ = require('lodash/fp');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const { addOption, getEnvVar, removeEmpty } = require('./utils');

function setPlugins(builderConfig, webpackConfig) {
  const ifOptimize = option => addOption(builderConfig.optimize, option);
  const ifDebug = option => addOption(builderConfig.debug, option);
  const ifExtractCss = option => addOption(builderConfig.extractCss, option);
  const unlessServerRendering = option => addOption(!builderConfig.serverRendering, option);

  const shouldUseNotifierPlugin =
    builderConfig.developerAids && !builderConfig.serverRendering && !process.env.NO_WEBPACK_NOTIFIER;

  const WebpackNotifierPlugin = shouldUseNotifierPlugin
    ? require('webpack-notifier') // eslint-disable-line import/no-extraneous-dependencies,global-require,max-len
    : null;

  const plugins = removeEmpty([
    WebpackNotifierPlugin ? new WebpackNotifierPlugin({ alwaysNotify: true }) : null,

    ifDebug(
      () =>
        new CircularDependencyPlugin({
          cwd: process.cwd(),
          exclude: /node_modules/,
          failOnError: true,
          // onDetected({ paths, compilation }) {
          //   if (paths.some(p => p.includes('listings/leaf'))) {
          //     compilation.errors.push(new Error(paths.join(' -> ')));
          //   }
          // },
        }),
    ),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: getEnvVar('NODE_ENV'),
        RAILS_ENV: getEnvVar('RAILS_ENV'),
        SERVER_RENDERING: !!builderConfig.serverRendering,
        DRY_RUN: getEnvVar('DRY_RUN'),
      },
    }),

    unlessServerRendering(
      () =>
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        }),
    ),

    unlessServerRendering(
      () =>
        new ManifestPlugin({
          filename: 'manifest.json',
          publicPath: `/webpack/${process.env.NODE_ENV}/`,
        }),
    ),

    ifOptimize(() => new CompressionPlugin()),

    ifExtractCss(
      () =>
        new MiniCssExtractPlugin({
          filename: '[name].bundle.[contenthash].css',
        }),
    ),
  ]);

  return _.set('plugins', plugins, webpackConfig);
}

module.exports = _.curry(setPlugins);
