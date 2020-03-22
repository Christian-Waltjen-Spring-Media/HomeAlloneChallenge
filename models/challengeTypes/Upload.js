const fs = require('fs');

const uploadFile = (uploadFile, userId) => {
  return new Promise(((resolve) => {
    const oldFilePath = uploadFile.path;
    const challengeFolderPath = `./uploads/${userId}`;
    if (!fs.existsSync(challengeFolderPath)) {
      fs.mkdirSync(challengeFolderPath);
    }
    const newFilePath = `${challengeFolderPath}/${uploadFile.filename}`;

    fs.rename(oldFilePath, newFilePath, () => {
      resolve();
    });
  }));
};

exports.solve = (req, res, cb) => {

  uploadFile(req.file, req.user)
    .then(() => {
      const url = '/challenges/types';
      req.flash('success', { msg: 'File was uploaded successfully.' });
      res.redirect(302, url);
      cb();
    });
};

exports.type = "upload";