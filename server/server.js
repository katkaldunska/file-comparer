const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const testFolder = './files/';


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/hello', (req, res) => {
  // res.send({ express: 'Hello From Express' });

  //
  // parseFiles().then(data => {
  //   res.send(data);
  // });
  parseFiles().then(data => res.send(data)).catch(err => console.log(err));
});


const parseFiles = () => {
  return new Promise((resolve, reject) => {
    const translation = {};

    readFiles().then(async files => {

      for (let file of files) {
        const filepath = `${testFolder}${file}`;
        const data = await readFile(filepath);
        const dataParsed = JSON.parse(data);

        Object.keys(dataParsed).forEach(key => {
          if (!translation[key]) {
            translation[key] = [];
          }
          translation[key].push({[file]: dataParsed[key]});
        });
      }
      resolve({translation, files});
     });
    })
    .catch(err => reject(err));

};

const readFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(testFolder, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};

const readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data) {
      if (err) {
          reject(err);
        }
      resolve(data);
    });
  });
};

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {app};
