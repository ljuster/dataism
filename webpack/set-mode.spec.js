const setMode = require('./set-mode');

describe('webpack/set-mode', () => {
  describe('when builderConfig.developerAids is `true`' ,() => {
    const builderConfig = { developerAids: true };
    it('set mode as development', () => {
      const actual = setMode(builderConfig, {}).mode;
      expect(actual).toBe('development');
    });
  });

  describe('when builderConfig.developerAids is not set or `false`' ,() => {
    const builderConfig = { };
    it('set mode as production', () => {
      const actual = setMode(builderConfig, {}).mode;
      expect(actual).toBe('production');
    });
  });
});