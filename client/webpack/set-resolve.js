const _ = require('lodash/fp');
const path = require('path');

function setResolve(_builderConfig, webpackConfig) {
  const resolve = {
    modules: [
      // In fact this is used only to resolve aliases from scss modules
      // For JS we use `babel-plugin-module-resolver`
      path.resolve(__dirname, '..'),
      path.resolve(__dirname, '..', 'app'),
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  };

  return _.set('resolve', resolve, webpackConfig);
}

module.exports = _.curry(setResolve);
