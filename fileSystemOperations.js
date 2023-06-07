const fs = require("fs");
const path = require("path");

const writeDataToDisk = (body, filePath) => {
  fs.writeFile(filePath, body, err => {
    if (err) {
      console.log("There was an error writing the file to disk:", err);
      process.exit();
    }
    fs.readFile(filePath, { encoding: 'UTF8' }, (err, data) => {
      if (err) {
        console.log("Error:", err);
        process.exit();
      }
      console.log(`Successfully saved ${filePath} with ${data.length}`);
      process.exit();
    });
  });
}

const isFilePathAccessible = (filePath) => {  
  try {
    const directory = path.dirname(filePath);
    if (directory !== '.') {
      fs.accessSync(directory, fs.constants.F_OK);
    }    
    return true;
  }
  catch(err) {
    return false;
  }
}

module.exports = { writeDataToDisk, isFilePathAccessible };