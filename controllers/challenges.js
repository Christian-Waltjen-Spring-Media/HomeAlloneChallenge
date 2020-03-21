const challengeTypes = require('../models/ChallengeTypes');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('challenges', {
    title: 'Challenges'
  });
};

exports.getCreateChallenge = (req, res) => {
  const types = Object.keys(challengeTypes).map((key) => ({ id: key, name: challengeTypes[key] }));

  res.render('challenges/create', {
    title: 'Challenges',
    challengeTypes: types
  });
};

exports.postCreateChallenge = (req, res) => {

  console.log(req);

  res.redirect(302, '/challenge');
};