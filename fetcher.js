const request = require('request');
const fs = require('fs')

//Retrieves URL and file name
const fetchArguments = () => {
  return process.argv.splice(2);
}

// Downloads the resource at the URL and writes it on the local path on the machine (arg 2).   
const download = (URL, localFile, printFunction) => {

  request(URL, (error, response, body) => {
   
    if (error) {
      console.error("Invalid URL");
      return
    }else if (response.statusCode === 404) {
      console.log("We could not find the page. The file path is invalid.")
      process.exit();
    }

    printFunction(body, localFile);
  });
}

//Prints out a message like Downloaded and saved 1235 bytes to ./index.html.
const print = (body, localFile) => {
  fs.writeFile(localFile, body, writeErr => {
    if (writeErr) {
      console.error(writeErr);
      return
    }
    fs.stat(localFile, (err, stats) => {
      if (err) {
        console.log(`File doesn't exist.`);
      } else {
        console.log(`Downloaded and saved ${stats.size} bytes to ${localFile}`);
      }
    });
  })
}


const args = fetchArguments();
download(args[0], args[1], print)

