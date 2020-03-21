const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  configuration: {},
  title: '',
  challengers: []
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
