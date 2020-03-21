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
  const id = req.body.challengeId;
  const url = `/results/${id}`;
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect(url);
};
