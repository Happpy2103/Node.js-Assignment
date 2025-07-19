const fs = require('fs');

function unlinkAsync(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

unlinkAsync('file1.txt')
  .then(() => console.log('File deleted successfully'))
  .catch(err => console.error('Error deleting file:', err));
