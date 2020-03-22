const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  score: Number,
  type: String,
  challengers: Array,
  participantTags: {}
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
