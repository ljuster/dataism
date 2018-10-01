const path = require('path');

module.exports = {
  addOption: (shouldAdd, option) => (shouldAdd ? option() : undefined),
  removeEmpty: array => array.filter(item => !!item),
  getEnvVar: ENV_VAR => JSON.stringify(process.env[ENV_VAR])
};
