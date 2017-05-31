'use strict';

export default function whisper(io, socket, users) {
  socket.on('whisper', result => {
    let whisperTarget = users.find(user => {
      if (user.username) return user.username.toLowerCase() === result.target.toLowerCase();
    });
    if (!whisperTarget || whisperTarget.currentRoom !== socket.currentRoom) return socket.emit('whisperFail');

    io.sockets.to(socket.currentRoom).emit('whisperSuccess', {text: result.text, from: socket.username, target: whisperTarget.username});
    return;
  });
}
