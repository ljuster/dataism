const setDevtool = require('./set-devtool');

describe('webpack/set-devtool', () => {
  describe('when builderConfig.devtool is not defined', () => {
    it('outputs to a public path', () => {
      const actual = setDevtool({}, {}).devtool;

      expect(actual).toBeUndefined();
    });
  });

  describe('when builderConfig.sourceMaps is set to "foo"', () => {
    const builderConfig = { sourceMaps: 'foo' };

    it('sets config\'s devtool to "foo"', () => {
      const expected = 'foo';
      const actual = setDevtool(builderConfig, {}).devtool;

      expect(actual).toEqual(expected);
    });
  });
});
