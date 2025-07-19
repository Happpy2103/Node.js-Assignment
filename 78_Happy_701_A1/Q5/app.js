const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

const zipFilePath = path.join(__dirname, 'my_folder.zip');
const extractToPath = path.join(__dirname, 'unzipped_folder');

fs.createReadStream(zipFilePath)
  .pipe(unzipper.Extract({ path: extractToPath }))
  .on('close', () => {
    console.log(` Extracted "${zipFilePath}" to "${extractToPath}"`);
  })
  .on('error', (err) => {
    console.error(` Error: ${err.message}`);
  });
