const _ = require('lodash/fp');
const path = require('path');

const serverBundleOutput = () => ({
  filename: 'server-bundle.js',
  path: `${path.resolve(__dirname, '..', '..', 'public', 'webpack', process.env.NODE_ENV)}/`,
});

const normalOutput = () => ({
  filename: '[name].bundle.[chunkhash].js',
  path: `${path.resolve(__dirname, '..', '..', 'public', 'webpack', process.env.NODE_ENV)}/`,
});

function setOutput(builderConfig, webpackConfig) {
  const output = _.cond([[_.get('serverRendering'), serverBundleOutput], [_.constant(true), normalOutput]])(
    builderConfig,
  );

  if (builderConfig.developerAids) {
    output.pathinfo = true;
    // https://reactjs.org/docs/cross-origin-errors.html
    // https ://webpack.js.org/configuration/output/#output-crossoriginloading
    output.crossOriginLoading = 'anonymous';
  }

  return _.set('output', output, webpackConfig);
}

module.exports = _.curry(setOutput);
