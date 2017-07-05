'use strict';

export default function oneLineListeners(socket, users) {
  socket.on('say', message => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {...message, commType: ' says, '}));
  if (!process.env.TESTING) socket.on('changeName', name => socket.username = name);
  socket.on('changeDescription', desc => socket.description = desc);
  socket.on('updateEquipment', eq => socket.equipment = eq);
  socket.on('getAllFromInventory', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets everything they can from ${item.container.short}.`}));
  socket.on('putInContainer', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts ${item.item.short} in ${item.container.short}.`}));
  socket.on('putAllInInventoryContainer', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` puts everything they're carrying in ${item.container.short}.`}));
  socket.on('pickedFromInventory', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.item.short} from ${item.container.short}.`}));
  socket.on('drink', item => socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` drinks ${item.item.short}.`}));
  socket.on('who', () => socket.emit('generalMessage', {onlineUsers: users.filter(user => user.username).map(user => `${user.username}`)}));
}
