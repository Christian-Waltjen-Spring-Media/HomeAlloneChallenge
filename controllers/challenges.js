const challengeTypes = require('../models/ChallengeTypes');
const Challenge = require('../models/Challenge');

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  res.render('challenges', {
    title: 'Challenges',
    challenges: await Challenge.find()
  });
};

exports.getCreateChallenge = (req, res) => {
  const types = Object.keys(challengeTypes).map((key) => ({ id: key, name: challengeTypes[key] }));

  res.render('challenges/create', {
    title: 'Challenges',
    types
  });
};

exports.postCreateChallenge = async (req, res) => {
  const challenge = new Challenge({
    ...req.body,
    score: 100,
    challengers: []
  });

  challenge.save();

  res.redirect(302, '/challenge');
};

exports.getChallenge = async (req, res) => {
  const challenge = await Challenge.findOne({ _id: req.params.challengeId });

  console.log('challenge type', challenge.type);

  res.render(`challenges/types/${challenge.type}`, {
    challenge
  });
};

exports.postSolveChallenge = async (req, res) => {
  const challenge = Challenge.find({ _id: req.params.challengeId });

  challenge.challengers.push(req.user._id);
  challenge.save();

  res.redirect(302, `/challenge/${challenge._id}`);
};
