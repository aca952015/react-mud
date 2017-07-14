'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function lookInContainer(socket, roomData) {
  socket.on('lookInContainer', containerObj => {
    let container = termsProcessor(roomData[socket.currentRoom].items, containerObj.container.split('.'));

    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    socket.emit('generalMessage', {containedItems: container.container.contains});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
      feedback: ` looks in ${container.short}.`
    });
  });
}
