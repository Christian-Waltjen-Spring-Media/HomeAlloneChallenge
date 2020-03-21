const fs = require('fs');
const challengeTypes = require('../models/challenge/Types');
const participantTags = require('../models/challenge/ParticipantTags');
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
    types,
    participantTags,
  });
};

exports.postCreateChallenge = async (req, res) => {
  const challenge = new Challenge({
    ...req.body,
    score: 100,
    participantTags: {
      together: req.body[participantTags.together],
      other: req.body[participantTags.other],
      self: req.body[participantTags.self]
    },
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

/**
 * GET /
 */
exports.uploads = (req, res) => {
  const challengeFolderPath = `./uploads/${req.user._id}`;
  fs.readdir(challengeFolderPath, (err, files) => {
    if (err) return;
    files = files.filter((item) => !(/(^|\/)\.[^\/\.]/g).test(item));
    res.render('challenges/types', {
      title: 'Your Challenge Results',
      fileList: files,
      folder: req.user._id,
      profile: req.user
    });
  });
};

exports.postSolveChallenge = (req, res) => {
  // const challenge = Challenge.find({ _id: req.params.challengeId });
  // challenge.challengers.push(req.user._id);
  // challenge.save();
  // res.redirect(302, `/challenge/${challenge._id}`);

  const oldFilePath = req.file.path;
  const challengeFolderPath = `./uploads/${req.user._id}`;
  if (!fs.existsSync(challengeFolderPath)) {
    fs.mkdirSync(challengeFolderPath);
  }
  const newFilePath = `${challengeFolderPath}/${req.file.filename}`;

  fs.rename(oldFilePath, newFilePath, function () {
    const url = '/challenges/types';
    req.flash('success', { msg: 'File was uploaded successfully.' });
    res.redirect(302, url);
  });
};
