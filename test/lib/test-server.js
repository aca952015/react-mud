'use strict';

let io = require('socket.io').listen(5000);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import initialConnect from '../../sockets/initial-connect.js';
import serverSocketListeners from '../../sockets/server-socket-listeners.js';
import mobTargetSelector from '../../sockets/mob-target-selector.js';
import {roomData} from '../../app/data/rooms.js';

dotenv.load();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

const users = [];
const mobsInCombat = [];
const alteredRooms = [];

process.env.TESTING = true;

io.sockets.on('connection', function(socket) {
  initialConnect(socket);
  socket.currentRoom = 'Nexus';
  socket.join('Nexus');
  socket.on('changeName', name => {
    if (name === 'alien') {
      socket.currentRoom = 'Town Square';
      socket.leave('Nexus');
      socket.join('Town Square');
    }
    socket.username = name;
    users.push(socket);
  });
  socket.on('testDamage', () => {
    socket.emit('damage', {
      damage: 1,
      enemy: {
        short: 'Tester'
      }
    });
  });
  socket.on('updateSocket', () => socket.emit('updateComplete'));
  socket.on('testMobSelector', () => mobTargetSelector(mobsInCombat, users));
  socket.on('triggerTick', () => socket.emit('tick'));
  serverSocketListeners(io, socket, users, roomData, mobsInCombat, alteredRooms);
});

export default function closeServer() {
  io.close();
  mongoose.disconnect();
}
