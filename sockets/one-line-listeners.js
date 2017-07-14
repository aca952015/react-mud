'use strict';

// A collection of relatively simple socket listeners, tucked away in here so they don't clutter up
// other files. The kids' table, if you will.
export default function oneLineListeners(socket, users) {
  socket.on('changeDescription', desc => socket.description = desc.playerDescription);
  if (!process.env.TESTING) socket.on('changeName', name => socket.username = name);
  socket.on('disconnect', () => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' vanishes into the nether.'}));
  socket.on('drink', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` drinks ${item.item.short}.`}));
  socket.on('getAllFromInventory', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets everything they can from ${item.container.short}.`}));
  socket.on('pickedFromInventory', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.item.short} from ${item.container.short}.`}));
  socket.on('playerDeath', () => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' has been SLAIN!'}));
  socket.on('putInContainer', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts ${item.item.short} in ${item.container.short}.`}));
  socket.on('putAllInInventoryContainer', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts everything they're carrying in ${item.container.short}.`}));
  socket.on('updateEffects', effects => socket.effects = effects);
  socket.on('updateEquipment', eq => socket.equipment = eq);
  socket.on('say', message => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {...message, commType: ' says, '}));
  socket.on('swapEquips', itemObj => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` swaps ${itemObj.item.short} with ${itemObj.quietAdd.short}.`}));
  socket.on('who', () => socket.emit('generalMessage', {onlineUsers: users.filter(user => user.username).map(user => `${user.username}`)}));
}
