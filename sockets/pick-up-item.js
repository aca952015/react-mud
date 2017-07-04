'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function pickUpItem(socket, roomData) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true
  };

  socket.on('pickUpItem', itemShort => {
    if (itemShort.item === 'all') {
      if (!roomData[socket.currentRoom].items.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing in the room to get.'});
      let validItems = roomData[socket.currentRoom].items.filter(item => !invalidTypes[item.type]);
      if (!validItems.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing you can get.'});
      validItems.forEach(item => roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(item), 1));
      socket.emit('getAll', {itemArray: validItems});
      socket.emit('generalMessage', {feedback: 'You get everything you can from the room.'});
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' picks up everything they can in the room.'});
    }
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

    if (getObj.item === 'all') {
      if (!container.container.contains.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing in that container to get.'});
      let validItems = container.container.contains.filter(item => !invalidTypes[item.type]);
      validItems.forEach(item => container.container.contains.splice(container.container.contains.indexOf(item), 1));
      socket.emit('getAll', {itemArray: validItems});
      socket.emit('generalMessage', {feedback: `You get everything you can from ${container.short}.`});
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets everything they can from ${container.short}.`});
    }

    let item = termsProcessor(container.container.contains, getObj.item.split('.'));
    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item in that container.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    socket.emit('forceGet', item);
    socket.emit('generalMessage', {feedback: `You pick up ${item.short} from ${container.short}.`});
    container.container.contains.splice(container.container.contains.indexOf(item), 1);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.short} from ${container.short}.`});
  });
}
