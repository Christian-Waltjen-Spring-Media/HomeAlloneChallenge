/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('challenges', {
    title: 'Challenges'
  });
};
