'use strict';

let io = require('socket.io').listen(5000);
import dropItem from '../../sockets/drop-item.js';
import look from '../../sockets/look.js';
import movement from '../../sockets/movement.js';
import pickUpItem from '../../sockets/pick-up-item.js';
import unlock from '../../sockets/unlock.js';
import kill from '../../sockets/kill.js';
import damage from '../../sockets/damage.js';
import put from '../../sockets/put.js';
import give from '../../sockets/give.js';
import whisper from '../../sockets/whisper.js';
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
  socket.on('changeDescription', desc => socket.description = desc);
  dropItem(socket, roomData);
  look(socket, users, roomData);
  movement(socket, users, roomData);
  pickUpItem(socket, roomData);
  unlock(socket, roomData);
  whisper(io, socket, users);
  kill(socket, roomData, mobsInCombat);
  damage(socket, roomData, mobsInCombat);
  give(socket, users);
  put(socket, roomData);
});

export default function closeServer() {
  io.close();
}
