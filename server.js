const express = require('express');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} made on ${req.url} at [${new Date().toISOString()}]`);
  next();
};

server.use(logger);
server.use(express.json());

server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
