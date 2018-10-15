const setResolve = require('./set-resolve');

describe('webpack/set-resolve', () => {
  it('adds modules, extensions, and aliases', () => {
    const actual = setResolve({}, {});

    expect(actual).toHaveProperty('resolve.modules');
    expect(actual).toHaveProperty('resolve.extensions');
  });
});
