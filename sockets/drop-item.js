'use strict';

export default function dropItem(socket, roomData) {
  socket.on('drop', item => {
    roomData[socket.currentRoom].items.push(item.item);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      feedback: ` drops ${item.item.short}.`
    });
  });

  socket.on('dropAll', itemObj => {
    roomData[socket.currentRoom].items = roomData[socket.currentRoom].items.concat(itemObj.itemArray);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ' drops everything they\'re carrying.'});
  });
}
