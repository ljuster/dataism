const _ = require('lodash/fp');

const setModule = require('./set-module');

it('adds loaders', () => {
  const actual = setModule({}, {});

  expect(actual).toHaveProperty('module.rules');
});

describe('extractCss', () => {
  describe('when builderConfig.extractCss is true', () => {
    it('uses the extract css plugin for the css and sass loaders', () => {
      const builderConfig = { extractCss: true };
      const cssLoader = _.find({ test: /\.css$/ }, setModule(builderConfig, {}).module.rules);
      const sassLoader = _.find(
        { test: /^((?!\.global).)*\.scss$/ },
        setModule(builderConfig, {}).module.rules,
      );

      expect(cssLoader.use[0]).toMatch(/mini-css-extract-plugin/);
      expect(sassLoader.use[0]).toMatch(/mini-css-extract-plugin/);
    });
  });
});
