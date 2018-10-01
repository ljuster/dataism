const builder = require('./webpack/builder');

/*
 * builder config options:
 *
 * developerAids: ?boolean - things like babel type check, react perf tools, pathinfo, etc.
 * extractCss: ?boolean - extract styles out of JS and into bundle CSS files
 * optimize: ?boolean - performance optimizations like uglify, minimize, etc.
 * serverRendering: ?boolean - whether you are server rendering (different entry, env vars)
 * sourceMaps: ?string - webpack's 'devtool' setting, renamed for clarity
 */
const BUILDER_CONFIGS = {
  dev: {
    developerAids: true,
    extractCss: true,
    sourceMaps: 'eval',
    debug: false,
  },

  serverBundleDev: {
    developerAids: true,
    serverRendering: true,
    sourceMaps: 'eval',
  },

  prod: {
    extractCss: true,
    optimize: true,
    sourceMaps: 'source-map',
  },

  serverBundleProd: {
    optimize: false,
    serverRendering: true,
    sourceMaps: 'source-map',
  },

  rspec: {
    developerAids: true,
    extractCss: true,
    sourceMaps: false,
  },

  serverBundleRspec: {
    developerAids: true,
    serverRendering: true,
    sourceMaps: 'eval',
  },
};

module.exports = (env = 'prod') => builder(BUILDER_CONFIGS[env]);
