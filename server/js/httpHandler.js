const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  let message = messagesQueue.dequeue();
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // console.log(path);
  console.log(req.contentType);
  // let background = this.backgroundImageFile.bind(this);
  // res.writeHead(200, headers);
  // res.end(message.toString());
  if (req.method === 'GET') {
    if (req.url.toString() === '/') {
      res.writeHead(200, headers);
      res.end(message.toString());
    }
    if (req.url === '/background.jpg') {
      //res.sendFile(this.backgroundImageFile);
      fs.readFile(this.backgroundImageFile, (err, data) => {
        if(err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data);
          // res.sendFile(data);
          res.end();
        }
      })
    }
  } else if (req.method === 'POST') {
    let img = Buffer.alloc(0);
    req.on('data', chunk => {
      img = Buffer.concat([img, chunk])
    })
    // res.writeHead(200, headers);
    // res.end('image');

    req.on('end', () => {
      // let imgParsed = multipart.getFile(img);
      fs.readFile(img, (err, image) => {
        if(err) {
          res.writeHead(404, headers);
        } else {
          fs.writeFile(this.backgroundImageFile, image, () => {
            console.log('The file has been saved!');
            // res.writeHead(200,  headers);
            // res.write(this.backgroundImageFile);
            // res.end();
            res.writeHead(200, headers);
            res.write(this.backgroundImageFile);
            // res.sendFile(data);
            res.end();
          })
        }
      })
    })

    // res.writeHead(200,  headers);
    // res.write(this.backgroundImageFile);
    // res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
