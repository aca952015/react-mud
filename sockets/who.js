'use strict';

module.exports = function(socket, users) {
  socket.on('who', () => {
    let onlineUsers = users.filter(user => user.username).map(user => `${user.username}`);
    socket.emit('generalMessage', {onlineUsers});
  });
};
