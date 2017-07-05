'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function put(socket, roomData) {
  socket.on('put', putObj => {
    let container = termsProcessor(roomData[socket.currentRoom].items, putObj.container.split('.'));

    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});
    if (!container.container.holds.includes(putObj.item.type)) return socket.emit('generalMessage', {feedback: 'That container doesn\'t hold that type of item.'});

    socket.emit('forceDrop', putObj.item);
    socket.emit('generalMessage', {feedback: `You put ${putObj.item.short} in ${container.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts ${putObj.item.short} in ${container.short}.`});

    container.container.contains.push(putObj.item);
  });

  socket.on('putAllInRoomContainer', putObj => {
    let container = termsProcessor(roomData[socket.currentRoom].items, putObj.container.split('.'));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    socket.emit('forceDropAll');
    socket.emit('generalMessage', {feedback: `You put everything you're carrying in ${container.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts everything they're carrying in ${container.short}.`});

    container.container.contains.concat(putObj.itemArray);
  });
}
