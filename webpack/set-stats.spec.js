const setStats = require('./set-stats');

describe('webpack/set-stats', () => {
  it('sets `stats` object with modules set to false', () => {
    const actual = setStats({}, {}).stats;
    const expected = false;

    expect(actual).toHaveProperty('modules', expected);
  });
});
