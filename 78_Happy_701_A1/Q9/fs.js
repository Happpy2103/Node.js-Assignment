const fs = require('fs').promises;

async function fsOperations() {
  const filePath = 'file1.txt';
  const newFilePath = 'renamed_file.txt';

  try {
    //  Create or write to a file
    await fs.writeFile(filePath, 'Hello from CommonJS!\n');
    console.log(' File created and content written.');

    //  Append content
    await fs.appendFile(filePath, 'Appending more data...\n');
    console.log('Content appended.');

    // Read the file
    const data = await fs.readFile(filePath, 'utf-8');
    console.log('\n File Content:\n' + data);

    // Rename the file
    await fs.rename(filePath, newFilePath);
    console.log(`File renamed to ${newFilePath}`);

    //  Delete the file
    await fs.unlink(newFilePath);
    console.log('File deleted.');

  } catch (err) {
    console.error('Error:', err);
  }
}

fsOperations();
