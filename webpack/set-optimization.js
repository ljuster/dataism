const _ = require('lodash/fp');

const { addOption } = require('./utils');

function setOptimization(builderConfig, webpackConfig) {
  const ifClient = option => addOption(!builderConfig.serverRendering, option);

  const optimization = {
    minimize: builderConfig.optimize,
    ...ifClient(() => ({
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            priority: -20,
          },
        },
      },
    })),
  };
  return _.set('optimization', optimization, webpackConfig);
}

module.exports = _.curry(setOptimization);
