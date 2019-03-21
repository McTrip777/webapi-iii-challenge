const express = require('express');

const userRouter = require('./data/router/user_router.js');
const postRouter = require('./data/router/post_router.js');

const server = express();

server.use(express.json());

server.get('/', ( req, res ) => {
    try {
        res.status(200).json({ greeting: process.env.GREETING }).send('Hello World!!!');
      } catch (error) {
        console.error('\nERROR', error);
        res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
      }
})

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;