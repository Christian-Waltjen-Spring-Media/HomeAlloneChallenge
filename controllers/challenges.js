const fs = require('fs');
const challengeTypes = require('../models/challenge/Types');
const participantTags = require('../models/challenge/ParticipantTags');
const Challenge = require('../models/Challenge');
const TypeFactory = require('../models/challengeTypes/Factory');

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

exports.indexFlagged = async (req, res) => {

  const challengeCategoryList = [{
    _id: 1,
    name: 'Zuhause / @home',
    description: ''
  }, {
    _id: 2,
    name: 'Roberts Koch-Institut',
    description: ''
  }, {
    _id: 3,
    name: 'kreativer Kopf/Einfallsreichtum',
    description: ''
  }, {
    _id: 4,
    name: 'Know-how',
    description: ''
  }, {
    _id: 5,
    name: 'Move move move',
    description: ''
  }, {
    _id: 6,
    name: 'Do it for yourself',
    description: ''
  }, {
    _id: 7,
    name: 'Soziale Kontakte',
    description: ''
  }];
  console.log(req.params);
  res.render('challenges', {
    title: 'ICH',
    subtitle: 'Herausforderungen für mich',
    categories: challengeCategoryList,
    challenges: [],
    flag: req.params.flag
  });


  // const challengeSelect = {};
  // challengeSelect[`participantTags.${req.params.flag}`] = { $exists: true };
  //
  // res.render('challenges', {
  //   title: 'Challenges',
  //   challenges: await Challenge.find(challengeSelect)
  // });
};

exports.indexFlaggedCategory = async (req, res) => {
  const challengeSelect = {};
  console.log(req.params.category);
  challengeSelect[`participantTags.${req.params.flag}`] = { $exists: true };
  challengeSelect.category = req.params.category;

  res.render('challenges', {
    title: 'Challenges',
    categories: [],
    challenges: await Challenge.find(challengeSelect),
    flag: req.params.flag
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
    res.render('content', {
      title: 'Your Challenge Results',
      fileList: files,
      folder: req.user._id,
      profile: req.user,
      challenges: [],
      categories: []
    });
  });
};

exports.postSolveChallenge = async (req, res) => {
  //const challenge = await Challenge.findOne({ _id: req.params.challengeId });
  //const challengeStrategy = TypeFactory.getStrategy(challenge);
  // await challengeStrategy.solve();

  const oldFilePath = req.file.path;
  const challengeFolderPath = `./uploads/${req.user._id}`;
  if (!fs.existsSync(challengeFolderPath)) {
    fs.mkdirSync(challengeFolderPath);
  }
  const newFilePath = `${challengeFolderPath}/${req.file.filename}`;

  fs.rename(oldFilePath, newFilePath, () => {
    const url = '/content';
    req.flash('success', { msg: 'File was uploaded successfully.' });
    res.redirect(302, url);
  });

  //res.redirect(302, '/challenges/types');
};
