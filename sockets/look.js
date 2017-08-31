'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function look(socket, users, roomInfo) {
  socket.on('look', args => {

    // If the target has equipment (and is thus a player), send a response with their name, desc, and equipment
    // Otherwise, just send the description
    function showMeTheDescription(target) {
      if (target.equipment) return socket.emit('generalMessage', {playerDescription: target.description, name: target.username, equipment: target.equipment});
      socket.emit('generalMessage', {feedback: target.description});
    }

    const room = {
      roomName: socket.currentRoom,
      roomTitle: roomInfo[socket.currentRoom].roomTitle,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    // Check players in the room besides the player
    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    const mobs = roomInfo[socket.currentRoom].mobs;

    // If the user entered LOOK <target> or LOOK IN <container>...
    if (args.target) {
      args.target = args.target.toLowerCase();
      const splitArgs = args.target.split('.');

      let lookTarget = termsProcessor(mobs, splitArgs);

      // If a mob is a match, return the mob's description.
      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
          from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
          feedback: ` looks at ${lookTarget.short}.`
        });
        return showMeTheDescription(lookTarget);
      }

      // If an item is a match, return the item's description.
      lookTarget = termsProcessor(room.items, splitArgs);

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
          from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
          feedback: ` looks at ${lookTarget.short}.`
        });
        return showMeTheDescription(lookTarget);
      }

      // If a player is a match, return the player's description and equipment.
      lookTarget = occupants.find(player => player.toLowerCase() === args.target);

      if (lookTarget) {
        const player = users.find(user => user.username === lookTarget);
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
          from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
          interaction: ' looks at ',
          target: lookTarget});
        return showMeTheDescription(player);
      }

      // If an examine is a match, return the examine
      if (room.examines) lookTarget = termsProcessor(room.examines, splitArgs);

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
          from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
          feedback: ` looks at ${lookTarget.name}.`
        });
        return showMeTheDescription(lookTarget);
      }

      // If neither mobs, items, players, or examines return a match, there must not be a valid target
      return socket.emit('generalMessage', {feedback: 'I don\'t see that here.'});
    }

    // This section is only reached if the user entered "LOOK" without a target.
    occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => {
      if (user.effects.death) return `The ghost of ${user.username}`;
      return user.username;
    });

    socket.emit('generalMessage', {occupants, room, mobs});
  });
}
