const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  categoryId: Number,
  name: String,
  description: String
});

const ChallengeCategory = mongoose.model('ChallengeCategory', challengeSchema);

module.exports = ChallengeCategory;
