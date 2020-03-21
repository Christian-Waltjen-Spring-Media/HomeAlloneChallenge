const fs = require('fs');

const challengeFolderPath = './uploads/';
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  fs.readdir(challengeFolderPath, (err, files) => {
    if (err) return;
    res.render('results', {
      title: 'Challenge Results',
      fileList: files
    });
  });
};
