const types = require('../challenge/Types');

exports.getStrategy = (challenge) => {
  switch (challenge.type) {
    case types.upload:
      return require('./Upload');
    case types.amount:
      return require('./Amount');
    default:
      return require('./Empty');
  }
};
