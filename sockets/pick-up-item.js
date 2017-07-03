'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function pickUpItem(socket, roomData) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true
  };

  socket.on('pickUpItem', itemShort => {
    let item = termsProcessor(roomData[socket.currentRoom].items, itemShort.item.split('.'));

    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item here.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    socket.emit('itemPickedUp', item);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` picks up ${item.short}.`});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(item), 1);
  });

  socket.on('getFromContainer', getObj => {
    let container = termsProcessor(roomData[socket.currentRoom].items, getObj.container.split('.'));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    let item = termsProcessor(container.container.contains, getObj.item.split('.'));
    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item in that container.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    socket.emit('forceGet', item);
    socket.emit('generalMessage', {feedback: `You pick up ${item.short} from ${container.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.short} from ${container.short}.`});
  });
}
