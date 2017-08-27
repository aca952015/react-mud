'use strict';

export default function whisper(io, socket, users) {
  socket.on('whisper', result => {
    // Sometimes there are errant sockets that don't have a username, so we need to check
    // if there is one first before attempting to use a string method on it.
    const whisperTarget = users.find(user => {
      if (user.username) return user.username.toLowerCase() === result.target.toLowerCase();
    });
    if (!whisperTarget || whisperTarget.currentRoom !== socket.currentRoom) return socket.emit('whisperFail');

    io.sockets.to(socket.currentRoom).emit('whisperSuccess', {
      text: result.text,
      from: socket.effects.death ? `The ghost of ${socket.username}` : socket.username,
      target: whisperTarget.effects.death ? `The ghost of ${whisperTarget.username}` : whisperTarget.username});
    return;
  });
}
