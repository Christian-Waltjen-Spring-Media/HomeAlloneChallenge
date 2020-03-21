const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  configuration: {},
  title: '',
  challengers: []
});

const User = mongoose.model('Challenge', challengeSchema);

module.exports = User;
