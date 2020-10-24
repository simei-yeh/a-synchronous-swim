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
  // console.log(req.contentType);
  // let background = this.backgroundImageFile.bind(this);
  res.writeHead(200, headers);
  res.end(message.toString());

  // if (req.url === '/') {
  //   res.writeHead(200, headers);
  //   res.end(message.toString());
  // }
  // if (req.url === '/background.jpg') {
  //   res.writeHead(200, headers);
  //   res.end();
  // }

  // if (req.contentType.is('application/json')) {

  //   res.writeHead(200, headers);
  //   res.end(message.toString());
  // }
  // if (req.contentType === 'background') {
  //   res.writeHead(200, headers);
  //   res.end();
  // }

  next(); // invoke next() at the end of a request to help with testing!
};
