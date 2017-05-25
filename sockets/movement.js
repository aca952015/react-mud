'use strict';

module.exports = (io, socket) => {
  socket.on('move', movement => {
    socket.broadcast.to(socket.currentRoom).emit('movementLeave', {username: socket.username, direction: movement.direction});
    socket.leave(socket.currentRoom);
    socket.join(movement.roomName);
    socket.currentRoom = movement.roomName;
    socket.broadcast.to(socket.currentRoom).emit('movementArrive', {username: socket.username, direction: movement.direction});
  });
};
