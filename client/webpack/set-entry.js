const _ = require('lodash/fp');

const entries = {
    'app': './app/bundles/App/client',
    'global': './app/bundles/global/index',
};

function setEntry(builderConfig, webpackConfig) {
  if (builderConfig.serverRendering) {
    return _.set('entry', './server-rendering-entry.js', webpackConfig);
  }

  return _.set('entry', entries, webpackConfig);
}

module.exports = _.curry(setEntry);
