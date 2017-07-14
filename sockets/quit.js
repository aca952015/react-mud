'use strict';

import {initialState as equipment} from '../app/data/equipment-initial-state.js';
import {roomData} from '../app/data/rooms.js';

export default function quit(socket) {
  socket.on('quit', () => {
    let room = {
      roomName: 'Login Room',
      desc: roomData['Login Room'].desc,
      exits: roomData['Login Room'].exits,
      items: roomData['Login Room'].items
    };
    let mobs = null;
    let occupants = [];
    socket.currentRoom = 'Login Room';
    socket.leave(socket.currentRoom);
    socket.join('Login Room');
    socket.emit('move', 'Login Room');
    socket.emit('generalMessage', {occupants, room, mobs});

    socket.effects = {};
    socket.equipment = equipment;
  });
}
