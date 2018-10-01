const setPerformance = require('./set-performance');

describe('webpack/set-performance', () => {
  describe('when builderConfig.optimize is true and .serverRendering is false', () => {
    it('sets the hints to "warning"', () => {
      const builderConfig = { optimize: true, serverRendering: false };

      const actual = setPerformance(builderConfig, {}).performance.hints;
      const expected = 'warning';

      expect(actual).toBe(expected);
    });
  });

  describe('when builderConfig.optimize is false', () => {
    it('sets the hints to "warning"', () => {
      const builderConfig = { optimize: false, serverRendering: false };

      const actual = setPerformance(builderConfig, {}).performance.hints;
      const expected = 'warning';

      expect(actual).toBe(expected);
    });
  });

  describe('when builderConfig.serverRendering is true', () => {
    it('sets the hints to "warning"', () => {
      const builderConfig = { optimize: true, serverRendering: true };

      const actual = setPerformance(builderConfig, {}).performance.hints;
      const expected = 'warning';

      expect(actual).toBe(expected);
    });
  });
});
