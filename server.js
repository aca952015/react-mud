'use strict';

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig = require('./webpack.config.js');
import whisper from './sockets/whisper.js';
import movement from './sockets/movement.js';
import pickUpItem from './sockets/pick-up-item.js';
import {roomData} from './app/data/rooms.js';

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
  socket.emit('updateRooms', roomData);
  socket.on('disconnect', () => {
    socket.broadcast.to(socket.currentRoom).emit('message', {text: `${socket.username} vanishes into the nether.`});
    users.splice(users.indexOf(socket), 1);
  });

  socket.on('message', message => io.sockets.to(socket.currentRoom).emit('message', message));
  socket.on('changeName', name => socket.username = name);
  socket.on('who', () => socket.emit('generalMessage', {onlineUsers: users.filter(user => user.username).map(user => `${user.username}`)}));
  pickUpItem(socket, roomData);
  whisper(io, socket, users);
  movement(socket, users);
});

server.listen(PORT);
