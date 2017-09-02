'use strict';

export default function unlock(socket, roomData, alteredRooms) {
  const opposites = {
    'east': 'west',
    'west': 'east',
    'up': 'down',
    'down': 'up',
    'south': 'north',
    'north': 'south'
  };
  const lockDirections = {
    'east': 'to the east',
    'west': 'to the west',
    'up': 'above',
    'down': 'below',
    'south': 'to the south',
    'north': 'to the north'
  };

  socket.on('lock', keyInfo => {
    const exit = roomData[socket.currentRoom].exits[keyInfo.direction];
    if (!exit) return socket.emit('generalMessage', {feedback: 'I don\'t see that exit here.'});
    if (!exit.requiredKey) return socket.emit('generalMessage', {feedback: 'That exit has nothing to lock.'});

    const correctKey = keyInfo.inventory.find(item => item.name === exit.requiredKey.name);
    if (!correctKey) return socket.emit('generalMessage', {feedback: 'You don\'t have the correct key to do that.'});

    exit.locked = !exit.locked;
    const targetRoom = roomData[socket.currentRoom].exits[keyInfo.direction].exit;
    const targetExits = roomData[targetRoom].exits;
    const oppositeExit = targetExits[opposites[keyInfo.direction]];
    oppositeExit.locked = !oppositeExit.locked;
    alteredRooms.push(socket.currentRoom);

    const action = oppositeExit.locked ? 'lock' : 'unlock';

    socket.emit('generalMessage', {feedback: `You ${action} the door ${lockDirections[keyInfo.direction]}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} ${action}s the door ${lockDirections[keyInfo.direction]}.`});
  });
}
