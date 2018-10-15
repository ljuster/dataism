const path = require('path');
const setOutput = require('./set-output');

describe('webpack/set-output', () => {
  it('outputs to public/wepback/{NODE_ENV}', () => {
    const actual = setOutput({}, {}).output.path;
    const expected = `${path.resolve(path.join('..', 'public', 'webpack', process.env.NODE_ENV))}/`;

    expect(actual).toEqual(expected);
  });

  describe('serverRendering', () => {
    describe('when builderConfig.serverRendering is true', () => {
      const builderConfig = { serverRendering: true };

      it('sets filename to "server-bundle.js"', () => {
        const expected = 'server-bundle.js';
        const actual = setOutput(builderConfig, {}).output.filename;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('developerAids', () => {
    describe('when builderConfig.developerAids is true', () => {
      const builderConfig = { developerAids: true };

      it('outputs to app/assets/webpack', () => {
        const actual = setOutput(builderConfig, {}).output.pathinfo;

        expect(actual).toBe(true);
      });
    });
  });
});
