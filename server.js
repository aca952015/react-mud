'use strict';

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig = require('./webpack.config.js');
import whisper from './sockets/whisper.js';
import movement from './sockets/movement.js';
import look from './sockets/look.js';
import lookInContainer from './sockets/look-in-container.js';
import give from './sockets/give.js';
import pickUpItem from './sockets/pick-up-item.js';
import dropItem from './sockets/drop-item.js';
import put from './sockets/put.js';
import unlock from './sockets/unlock.js';
import kill from './sockets/kill.js';
import damage from './sockets/damage.js';
import wearItem from './sockets/wear-item.js';
import mobTargetSelector from './sockets/mob-target-selector.js';
import {roomData} from './app/data/rooms.js';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/build`));
app.use(webpackDevMiddleware(webpack(webpackConfig)));

setInterval(() => io.sockets.emit('tick'), 30000);
setInterval(() => {
  io.sockets.emit('combatTick');
  mobTargetSelector(mobsInCombat, users);
}, 2000);

const users = [];
const mobsInCombat = [];

io.on('connection', socket => {
  users.push(socket);
  socket.on('disconnect', () => {
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {text: `${socket.username} vanishes into the nether.`});
    users.splice(users.indexOf(socket), 1);
  });

  socket.on('say', message => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {...message, commType: ' says, '}));
  socket.on('changeName', name => socket.username = name);
  socket.on('changeDescription', desc => socket.description = desc);
  socket.on('updateEquipment', eq => socket.equipment = eq);
  socket.on('putInContainer', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts ${item.item.short} in ${item.container.short}.`}));
  socket.on('pickedFromInventory', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.item.short} from ${item.container.short}.`}));
  socket.on('drink', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` drinks ${item.item.short}.`}));
  socket.on('who', () => socket.emit('generalMessage', {onlineUsers: users.filter(user => user.username).map(user => `${user.username}`)}));
  pickUpItem(socket, roomData);
  look(socket, users, roomData);
  dropItem(socket, roomData);
  whisper(io, socket, users);
  movement(socket, users, roomData);
  unlock(socket, roomData);
  kill(socket, roomData, mobsInCombat);
  damage(socket, roomData, mobsInCombat);
  give(socket, users);
  put(socket, roomData);
  lookInContainer(socket, roomData);
  wearItem(socket);
});

server.listen(PORT);
