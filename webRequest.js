const { writeDataToDisk } = require("./fileSystemOperations");
const request = require("request");

const requestFunction = (url, filePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.log("There was an error with the REQUEST (invalid URL?):", error);
      process.exit();
    }
    console.log(`StatusCode: ${response && response.statusCode}`);
    writeDataToDisk(body, filePath);
  });
}

module.exports = requestFunction;