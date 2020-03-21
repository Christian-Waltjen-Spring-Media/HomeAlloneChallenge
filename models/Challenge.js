const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  configuration: {},
  title: '',
  user: []
});

const User = mongoose.model('Challenge', challengeSchema);

module.exports = User;
