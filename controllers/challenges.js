/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('challenges', {
    title: 'Challenges'
  });
};

exports.getCreateChallenge = (req, res) => {
  res.render('challenges/create', {
    title: 'Challenges'
  });
};

exports.postCreateChallenge = (req, res) => {
  res.redirect(302, '/challenge');
};