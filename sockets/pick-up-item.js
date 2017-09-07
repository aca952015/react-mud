'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function pickUpItem(socket, roomData, alteredRooms) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true,
    'doodad': true
  };

  // Picking up an item from the room directly, not in a container
  socket.on('pickUpItem', itemShort => {
    if (itemShort.item === 'all') {
      // If the argument is all, don't pick up anything that's a liquid or corpse or other invalid item for picking up.
      if (!roomData[socket.currentRoom].items.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing in the room to get.'});
      const validItems = roomData[socket.currentRoom].items.filter(item => !invalidTypes[item.type]);
      if (!validItems.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing you can get.'});

      // For each item in the room, remove it from the room's items array, then add them all to the user's inventory.
      // Add the room to the alteredRooms array so the server knows to respawn items.
      if (!alteredRooms.includes(socket.currentRoom)) alteredRooms.push(socket.currentRoom);
      validItems.forEach(item => roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(item), 1));
      socket.emit('getAll', {itemArray: validItems});
      socket.emit('generalMessage', {feedback: 'You get everything you can from the room.'});
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' picks up everything they can in the room.'});
    }

    // If the argument is a specific item, check that it's in the room and valid to pick up.
    const item = termsProcessor(roomData[socket.currentRoom].items, itemShort.item.split('.'));

    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item here.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    // Add the room to the alteredRooms array so the server knows to respawn items.
    if (!alteredRooms.includes(socket.currentRoom)) alteredRooms.push(socket.currentRoom);
    socket.emit('forceGet', item);
    socket.emit('generalMessage', {feedback: `You pick up ${item.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` picks up ${item.short}.`});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(item), 1);
  });

  // Picking up an item from the room that's in a container.
  socket.on('getFromContainer', getObj => {
    const container = termsProcessor(roomData[socket.currentRoom].items, getObj.container.split('.'));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    if (getObj.item === 'all') {
      if (!container.container.contains.length) return socket.emit('generalMessage', {feedback: 'There\'s nothing in that container to get.'});
      const validItems = container.container.contains.filter(item => !invalidTypes[item.type]);

      validItems.forEach(item => container.container.contains.splice(container.container.contains.indexOf(item), 1));
      socket.emit('getAll', {itemArray: validItems});
      socket.emit('generalMessage', {feedback: `You get everything you can from ${container.short}.`});
      if (!alteredRooms.includes(socket.currentRoom)) alteredRooms.push(socket.currentRoom);
      return socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets everything they can from ${container.short}.`});
    }

    const item = termsProcessor(container.container.contains, getObj.item.split('.'));
    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item in that container.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    socket.emit('forceGet', item);
    socket.emit('generalMessage', {feedback: `You pick up ${item.short} from ${container.short}.`});
    container.container.contains.splice(container.container.contains.indexOf(item), 1);
    if (!alteredRooms.includes(socket.currentRoom)) alteredRooms.push(socket.currentRoom);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.short} from ${container.short}.`});
  });
}
