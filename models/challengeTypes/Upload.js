const fs = require('fs');

const uploadFile = (uploadFile, userId) => new Promise(((resolve) => {
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

exports.solve = async (req, res) =>
  uploadFile(req.file, req.user)
    .then(() => {
      req.flash('success', { msg: 'File was uploaded successfully.' });
    });

exports.type = 'upload';
