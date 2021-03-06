'use strict';

let io = require('socket.io').listen(5000);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import initialConnect from '../../sockets/initial-connect.js';
import serverSocketListeners from '../../sockets/server-socket-listeners.js';
import mobTargetSelector from '../../sockets/mob-target-selector.js';
import {roomData} from '../../app/data/rooms.js';

const TEST_ROOM = 'Test - Nexus';

dotenv.load();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});

const users = [];
const mobsInCombat = [];
const alteredRooms = [];

process.env.TESTING = true;

io.sockets.on('connection', function(socket) {
  socket.currentRoom = TEST_ROOM;
  socket.join(TEST_ROOM);
  socket.on('disconnect', () => users.splice(users.indexOf(users.find(user => user.username === socket.username)), 1));
  initialConnect(socket);
  socket.on('changeName', name => {
    if (name === 'alien') {
      socket.currentRoom = 'Test - Town Square';
      socket.leave(TEST_ROOM);
      socket.join('Test - Town Square');
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
  socket.on('triggerCombatTick', () => socket.emit('combatTick'));
  serverSocketListeners(io, socket, users, roomData, mobsInCombat, alteredRooms);
});

export default function closeServer() {
  io.close();
  mongoose.disconnect();
}
