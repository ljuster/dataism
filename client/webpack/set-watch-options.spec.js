const setWatchOptions = require('./set-watch-options');

describe('webpack/set-watch-options', () => {
  it('ignores node_modules', () => {
    const actual = setWatchOptions({}, {}).watchOptions;
    const expected = /node_modules/;

    expect(actual).toHaveProperty('ignored', expected);
  });
});
