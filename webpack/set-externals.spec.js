const setExternals = require('./set-externals');

describe('webpack/set-externals', () => {
  it('returns the config without making any changes', () => {
    const expected = {};
    const actual = setExternals({}, {});

    expect(actual).toEqual(expected);
  });
});
