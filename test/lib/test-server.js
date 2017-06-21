'use strict';

let io = require('socket.io').listen(5000);
import dropItem from '../../sockets/drop-item.js';
import look from '../../sockets/look.js';
import movement from '../../sockets/movement.js';
import pickUpItem from '../../sockets/pick-up-item.js';
import unlock from '../../sockets/unlock.js';
import whisper from '../../sockets/whisper.js';
import {roomData} from '../../app/data/rooms.js';

const users = [];

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
  socket.on('changeDescription', desc => socket.description = desc);
  dropItem(socket, roomData);
  look(socket, users, roomData);
  movement(socket, users, roomData);
  pickUpItem(socket, roomData);
  unlock(socket, roomData);
  whisper(io, socket, users);
});

export default function closeServer() {
  io.close();
}
