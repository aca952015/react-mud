'use strict';

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig = require('./webpack.config.js');
import initialConnect from './sockets/initial-connect.js';
import serverSocketListeners from './sockets/server-socket-listeners.js';
import mobTargetSelector from './sockets/mob-target-selector.js';
import {roomData} from './app/data/rooms.js';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

app.use(express.static(`${__dirname}/build`));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

// Every 30 seconds, emit a "tick" event.
// Every 2 seconds, emit combat ticks. Users autoattack if they're in combat on
// combat ticks, as do mobs that are currently in combat.
setInterval(() => io.sockets.emit('tick'), 30000);
setInterval(() => {
  io.sockets.emit('combatTick');
  mobTargetSelector(mobsInCombat, users);
}, 2000);

const users = [];
const mobsInCombat = [];

io.on('connection', socket => {
  initialConnect(socket);
  socket.on('changeName', () => users.push(socket));

  socket.on('disconnect', () => {
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' vanishes into the nether.'});
    users.splice(users.indexOf(users.find(user => user.username === socket.username)), 1);
  });

  serverSocketListeners(io, socket, users, roomData, mobsInCombat);
});

server.listen(PORT);
