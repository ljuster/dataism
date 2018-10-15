const _ = require('lodash/fp');

const setPlugins = require('./set-plugins');

describe('webpack/set-plugins', () => {
  it('adds plugins', () => {
    const actual = setPlugins({}, {});

    expect(actual).toHaveProperty('plugins');
    expect(actual.plugins.length).toBeGreaterThanOrEqual(0);
  });

  describe('serverRendering', () => {
    describe('when builderConfig.serverRendering is false', () => {
      it('adds manifest plugin', () => {
        const builderConfig = { serverRendering: false };
        const { plugins } = setPlugins(builderConfig, {});

        const actual = _.find(['constructor.name', 'ManifestPlugin'], plugins);

        expect(actual).toBeDefined();
      });
    });

    describe('when builderConfig.serverRendering is true', () => {
      it('does not add manifest plugin', () => {
        const builderConfig = { serverRendering: true };
        const { plugins } = setPlugins(builderConfig, {});

        const actual = _.find(['constructor.name', 'ManifestPlugin'], plugins);

        expect(actual).not.toBeDefined();
      });
    });
  });

  describe('optimize', () => {
    describe('when builderConfig.optimize is true', () => {
      const builderConfig = { optimize: true };

      it('adds compression plugin', () => {
        const { plugins } = setPlugins(builderConfig, {});

        const actual = _.find(['constructor.name', 'CompressionPlugin'], plugins);

        expect(actual).toBeDefined();
      });
    });
  });

  describe('extractCss', () => {
    describe('when builderConfig.extractCss is true', () => {
      const builderConfig = { extractCss: true };

      it('adds MiniCssExtractPlugin', () => {
        const { plugins } = setPlugins(builderConfig, {});

        const actual = _.find(['constructor.name', 'MiniCssExtractPlugin'], plugins);

        expect(actual).toBeDefined();
      });
    });
  });
});
