/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('file', {
    title: 'Upload your result',
    challengeId: req.params.challengeId
  });
};

exports.postUploadFile = (req, res) => {
  const url = '/results';
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect(url);
};
