'use strict';

module.exports = function(socket) {
  socket.on('message', message => {
    socket.broadcast.to('nexus').emit('message', message);
  });
};
