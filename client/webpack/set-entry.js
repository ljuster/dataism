const _ = require('lodash/fp');

const entries = {
  // 'hello-world': './app/bundles/HelloWorld/hello-world-bundle',
  'result-page': './app/bundles/ResultPage/index',
  'global': './app/bundles/global/index',
};

function setEntry(builderConfig, webpackConfig) {
  if (builderConfig.serverRendering) {
    return _.set('entry', './server-rendering-entry.js', webpackConfig);
  }

  return _.set('entry', entries, webpackConfig);
}

module.exports = _.curry(setEntry);
