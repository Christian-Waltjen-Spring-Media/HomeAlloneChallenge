const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  score: Number,
  type: String,
  challengers: Array
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
