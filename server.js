const express = require('express');

const userRouter = require('./data/router/user_router.js');
const postRouter = require('./data/router/post_router.js');

const server = express();

server.use(express.json());

server.get('/', ( req, res ) => {
    res.send('<h2>Welcome to my page!!!</h2>')
})

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

module.exports = server;