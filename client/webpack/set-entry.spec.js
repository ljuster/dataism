const setEntry = require('./set-entry');

describe('webpack/set-entry', () => {
  describe('serverRendering', () => {
    describe('when builderConfig.serverRendering is not defined', () => {
      const builderConfig = {};

      it('returns an object with base entry points', () => {
        const actual = setEntry(builderConfig, {}).entry;

        expect(actual).toBeInstanceOf(Object);
      });
    });

    describe('when builderConfig.serverRendering is `true`', () => {
      const builderConfig = { serverRendering: true };

      it('returns a simple string pointing to the server entry file', () => {
        const actual = setEntry(builderConfig, {}).entry;

        expect(actual).toBe('./server-rendering-entry.js');
      });
    });
  });
});
