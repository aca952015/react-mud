'use strict';

module.exports = (socket, users) => {
  socket.join('Nexus');
  socket.currentRoom = 'Nexus';

  socket.on('move', movement => {
    if (movement.direction !== 'login') {
      socket.broadcast.to(socket.currentRoom).emit('movementLeave', {username: socket.username, direction: movement.direction});
      socket.leave(socket.currentRoom);
      socket.join(movement.roomName);
      socket.currentRoom = movement.roomName;
      let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
                           .map(user => user.username);
      socket.emit('generalMessage', {occupants});
    }
    socket.broadcast.to(socket.currentRoom).emit('movementArrive', {username: socket.username, direction: movement.direction});
  });

  socket.on('look', () => {
    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
                         .map(user => user.username);
    socket.emit('generalMessage', {occupants});
  });
};
