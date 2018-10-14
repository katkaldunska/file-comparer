# file-comparer
App for comparing tags in two uploaded json files.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine

### Prerequisites

To run app on local computer required are:

- installed Node.js

### Installing

After cloning the repository install dependencies:
```
npm install
```

In one console run the server by
```
node server/server.js
```

In the second console run app
```
npm start
```

Open in web browser at
```
http://localhost:3000/
```
## How to use

Upload two files by either clicking on the dropzone or by drag'n'drop. By default in the folder '/files' are two files to compare. The right button deletes all the files from server. Uploading file that has a same name as existing one on the server overwrites it. There must be two files to compare.

After upload, click the first button on the left to load table with tags in both languages. App validates whether file is a correct json. The same tags for both languages, or empty translations, are marked red. Edit the values in table. Download files with edited values by clicking the left-bottom buttons.

## Built With
Node.js v10.4.1

Modules used for deployment
- bluebird
- express
- fs
- multer
- react
- react-bootstrap
- react-dom
- react-dropzone
- superagent

## Authors

**Katarzyna Kałduńska**
(https://github.com/katkaldunska)


## License

This project is licensed under the MIT License
