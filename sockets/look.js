'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function look(socket, users, roomInfo) {
  socket.on('look', args => {
    function showMeTheDescription(target) {
      socket.emit('generalMessage', {feedback: target.description});
    }

    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    let mobs = roomInfo[socket.currentRoom].mobs;

    if (args.target) {
      args.target = args.target.toLowerCase();
      let splitArgs = args.target.split('.');

      let lookTarget = termsProcessor(mobs, splitArgs);

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.short}.`});
        return showMeTheDescription(lookTarget);
      }

      lookTarget = termsProcessor(room.items, splitArgs);

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.short}.`});
        return showMeTheDescription(lookTarget);
      }

      lookTarget = occupants.find(player => player.toLowerCase() === args.target);

      if (lookTarget) {
        let player = users.find(user => user.username === lookTarget);
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, interaction: ' looks at ', target: lookTarget});
        return showMeTheDescription(player);
      }

      if (room.examines) {
        lookTarget = termsProcessor(room.examines, splitArgs);
      }

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.name}.`});
        return showMeTheDescription(lookTarget);
      }

      return socket.emit('generalMessage', {feedback: 'I don\'t see that here.'});
    }

    socket.emit('generalMessage', {occupants, room, mobs});
  });
}
