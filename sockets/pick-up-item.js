'use strict';

export default function pickUpItem(socket, roomData) {
  socket.on('pickUpItem', room => {
    socket.broadcast.emit('pickUpItem', {room, from: socket.username});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(room.item), 1);
  });
}
