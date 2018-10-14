const express = require('express');
const FileReader = require('./FileReader');
const uploads = require('./uploads');

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/defaultFiles', (req, res) => {
  FileReader.parseFiles()
    .then(data => res.send(data))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

app.use('/uploads', uploads);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {app};
