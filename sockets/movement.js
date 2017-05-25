'use strict';

module.exports = socket => {
  socket.on('move', movement => {
    socket.broadcast.to(socket.currentRoom).emit('movement', {user: socket.username, direction: movement.direction});
  });
};
