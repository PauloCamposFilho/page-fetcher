const fs = require("fs");
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });
const { isFilePathAccessible } = require("./fileSystemOperations");
const requestFunction = require('./webRequest');

let url, filePath;

if (process.argv.length <= 3) {
  if (process.argv.length === 2) console.log("No parameters passed.");
  if (process.argv.length === 3) console.log("Missing parameter");
  process.exit();
}

url = process.argv[2];
filePath = process.argv[3];

console.log(`Received parameters:`);
console.log(`url: ${url}`);
console.log(`filePath: ${filePath}`)
console.log("------");
console.log("Checking if filepath is valid...")

// verify that filePath is valid:

if (isFilePathAccessible(filePath)) {
  if (fs.existsSync(filePath)) {
    rl.question("File already exists. Overwrite?y/n: ", (answer) => {
      if (answer.toLocaleLowerCase() !== 'y') {
        console.log("Operation cancelled by user.");
        process.exit();
      }
      requestFunction(url, filePath);      
    });
  } else {
    requestFunction(url, filePath);
  }  
} else {
  console.log("Filepath is inacessible. Aborting.");
  process.exit();
}