const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  configuration: {},
  title: '',
  description: '',
  score: 100,
  type: '',
  challengers: []
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
