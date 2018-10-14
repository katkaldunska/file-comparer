const express = require('express');
const multer = require('multer');
const fs = require('fs');
const FileReader = require('./FileReader');
const router = express.Router();

const testFolder = './files/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    cb(null, fileIsValid(req, file, cb));
  }
});
const fileIsValid = (req, file, cb) => {
  console.log(`File content validation ${file.originalname}`);
  if (file.mimetype !== 'application/json') {
    console.error(`ERROR: File ${file.originalname} has incorrect mimetype`);
    return false;
  }

  return true;
}

router.post('/files', upload.single('jsonFile'), (req, res) => {
  res.status(200).send(true);
});

router.delete('/files', (req, res) => {
  FileReader.readFiles().then(files => {
    for (let file of files) {
      const filepath = `${testFolder}${file}`;
      fs.unlink(filepath,(err) => {
        if (err) throw err;
        console.log('File deleted');
      });
     }
  });
  res.status(200).send(true);
})

module.exports = router;
