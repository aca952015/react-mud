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
  let lockDirections = {
    'east': 'to the east',
    'west': 'to the west',
    'up': 'above',
    'down': 'below',
    'south': 'to the south',
    'north': 'to the north'
  };

  socket.on('lock', keyInfo => {
    let exit = roomData[socket.currentRoom].exits[keyInfo.direction];
    if (!exit) return socket.emit('generalMessage', {feedback: 'I don\'t see that exit here.'});
    let correctKey = keyInfo.inventory.find(item => item.name === exit.requiredKey.name);
    if (!correctKey) return socket.emit('generalMessage', {feedback: 'You don\'t have the correct key to do that.'});
    exit.locked = !exit.locked;
    let targetRoom = roomData[socket.currentRoom].exits[keyInfo.direction].exit;
    let targetExits = roomData[targetRoom].exits;
    let oppositeExit = targetExits[opposites[keyInfo.direction]];
    oppositeExit.locked = !oppositeExit.locked;
    let action = 'lock';
    if (!oppositeExit.locked) action = 'unlock';
    socket.emit('generalMessage', {feedback: `You ${action} the door ${lockDirections[keyInfo.direction]}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} ${action}s the door ${lockDirections[keyInfo.direction]}.`});
  });
}
