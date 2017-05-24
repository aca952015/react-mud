'use strict';

module.exports = function(io, socket, users) {

  socket.on('whisper', result => {

    let whisperTarget = users[Object.keys(users).find(user => {
      if (users[user].username) return users[user].username.toLowerCase() === result.target.toLowerCase();
    })];
    if (!whisperTarget) return socket.emit('whisperFail');
    if (whisperTarget.currentRoom !== socket.currentRoom) return socket.emit('whisperFail');
    if (whisperTarget) {
      io.sockets.to(socket.currentRoom).emit('whisperSuccess', {text: result.text, from: socket.username, target: whisperTarget.username});
      return;
    }
    socket.emit('whisperFail');
  });
};
