const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const testFolder = './files/';

class FileReader {

  static readFile(filepath) {
    return fs.readFileAsync(filepath, {encoding: 'utf-8'});
  }

  static readFiles() {
    return fs.readdirAsync(testFolder);
  }

  static parseFiles() {
    const translation = {};
    return new Promise((resolve, reject) => {
      FileReader.readFiles().then(async files => {

        for (let file of files) {
          const filepath = `${testFolder}${file}`;
          const data = await FileReader.readFile(filepath);
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
    });
  }
}

module.exports = FileReader;
