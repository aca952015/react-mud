'use strict';

import {itemData} from './app/data/items.js';

export default function lookHandler(socket, users, roomInfo) {
  socket.on('look', args => {
    args = args.toLowerCase();
    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    if (!args) return socket.emit('generalMessage', {occupants, room});

    let lookTarget = itemData[args];
    if (lookTarget) {
      let foundItem = room.items.find(item => item.terms.includes(args));
      if (!foundItem) return socket.emit('generalMessage', {text: 'I don\'t see that here.'});
      return socket.emit('generalMessage', {text: foundItem.description});
    }

    lookTarget = occupants.find(player => player.username.toLowerCase() === args);
    if (lookTarget) return socket.emit('generalMessage', {text: lookTarget.description});

    lookTarget = room.examines.find(examine => examine.terms.includes(args));
    if (!lookTarget) return socket.emit('generalMessage', {text: lookTarget.description});

    return socket.emit('generalMessage', {text: 'I don\'t see that here.'});
  });
}
