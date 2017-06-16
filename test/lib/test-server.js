'use strict';

let io = require('socket.io').listen(5000);
import dropItem from '../../sockets/drop-item.js';
import {roomData} from '../../app/data/rooms.js';

io.sockets.on('connection', function(socket) {
  socket.currentRoom = 'Nexus';
  socket.join('Nexus');
  socket.on('changeName', name => {
    socket.username = name;
  });
  dropItem(socket, roomData);
});

export default function closeServer() {
  io.close();
}
