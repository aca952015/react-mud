'use strict';

let io = require('socket.io').listen(5000);
import serverSocketListeners from '../../sockets/server-socket-listeners.js';
import mobTargetSelector from '../../sockets/mob-target-selector.js';
import {roomData} from '../../app/data/rooms.js';

const users = [];
const mobsInCombat = [];

io.sockets.on('connection', function(socket) {
  users.push(socket);
  socket.currentRoom = 'Nexus';
  socket.join('Nexus');
  socket.on('changeName', name => {
    if (name === 'alien') {
      socket.currentRoom = 'Town Square';
      socket.leave('Nexus');
      socket.join('Town Square');
    }
    socket.username = name;
  });
  socket.on('testDamage', () => {
    socket.emit('damage', {
      damage: 1,
      enemy: {
        short: 'Tester'
      }
    });
  });
  socket.on('testMobSelector', () => mobTargetSelector(mobsInCombat, users));
  serverSocketListeners(io, socket, users, roomData, mobsInCombat);
});

export default function closeServer() {
  io.close();
}
