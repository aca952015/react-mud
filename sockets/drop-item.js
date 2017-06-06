'use strict';

export default function dropItem(socket, roomData) {
  socket.on('drop', item => {
    roomData[socket.currentRoom].items.push(item.item);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      text: ` drops ${item.item.short}.`
    });
  });
}
