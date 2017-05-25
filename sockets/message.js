'use strict';

module.exports = function(io, socket) {
  socket.on('message', message => {
    io.sockets.to(socket.currentRoom).emit('message', message);
  });
};
