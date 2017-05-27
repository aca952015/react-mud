'use strict';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const whisper = require('./sockets/whisper.js');
const movement = require('./sockets/movement.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/build`));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

setInterval(() => io.sockets.emit('tick'), 30000);

const users = [];

io.on('connection', socket => {
  users.push(socket);
  socket.on('disconnect', () => {
    socket.broadcast.to(socket.currentRoom).emit('message', {text: `${socket.username} vanishes into the nether.`});
    users.splice(users.indexOf(socket), 1);
  });

  socket.on('message', message => io.sockets.to(socket.currentRoom).emit('message', message));
  socket.on('changeName', name => socket.username = name);
  socket.on('who', () => socket.emit('generalMessage', {onlineUsers: users.filter(user => user.username).map(user => `${user.username}`)}));
  whisper(io, socket, users);
  movement(socket, users);
});

server.listen(PORT);
