const express = require('express');

const postRouter = require('./data/user_router.js');

const server = express();

server.use(express.json());

server.get('/', ( req, res ) => {
    res.send('<h2>Welcome to my page!!!</h2>')
})

server.use('/api/users', postRouter);

module.exports = server;