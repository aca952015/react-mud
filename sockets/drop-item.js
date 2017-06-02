'use strict';

export default function dropItem(socket, roomData) {
  socket.on('drop', item => {
    roomData[socket.currentRoom].items.push(item.item);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {text: `${socket.username} drops ${item.item.short}.`});
  });
}
