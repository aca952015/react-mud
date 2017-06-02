'use strict';

export default function unlock(socket, roomData) {
  let opposites = {
    'east': 'west',
    'west': 'east',
    'up': 'down',
    'down': 'up',
    'south': 'north',
    'north': 'south'
  };

  socket.on('unlock', keyInfo => {
    let exit = roomData[socket.currentRoom].exits[keyInfo.direction];
    if (!exit) return socket.emit('generalMessage', {text: 'I don\'t see that exit here.'});
    let correctKey = keyInfo.inventory.find(item => item.name === exit.requiredKey.name);
    if (!correctKey) return socket.emit('generalMessage', {text: 'You don\'t have the correct key to unlock that.'});
    exit.locked = false;
    // Example for the next line:
    // roomData['Town Square'].exits['east'].exit = 'Gallows'
    // roomData['Gallows'].exits['west'].locked = false
    // The goal is to unlock the locked exit from both sides of the door
    roomData[roomData[socket.currentRoom].exits[keyInfo.direction].exit].exits[opposites[keyInfo.direction]].locked = false;
    socket.emit('generalMessage', {text: `You unlock the door to the ${keyInfo.direction}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {text: `${socket.username} unlocks the door to the ${keyInfo.direction}`});
  });
}
