const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

function zipFolder(sourceFolderPath, outputZipPath) {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', {
        zlib: { level: 9 }  
    });

    output.on('close', () => {
        console.log(`${archive.pointer()} total bytes`);
        console.log(`Folder "${sourceFolderPath}" has been zipped to "${outputZipPath}"`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.directory(sourceFolderPath, false);
    archive.finalize();

}
const folderToZip = path.join(__dirname, 'my_folder');    
const outputZip = path.join(__dirname, 'my_folder.zip');    

zipFolder(folderToZip, outputZip);
