'use strict';

export default function movement(socket, users, roomInfo) {
  socket.join('Login Room');
  socket.currentRoom = 'Login Room';

  socket.on('move', movement => {
    // Login has special functionality, so ignore most movement code if it's a login
    if (movement.direction !== 'login') {
      if (roomInfo[socket.currentRoom].exits[movement.direction].locked) return socket.emit('generalMessage', {feedback: 'That way is locked.'});
      socket.broadcast.to(socket.currentRoom).emit('movementLeave', {username: socket.username, direction: movement.direction});
      socket.leave(socket.currentRoom);

      // The new room is the room specified by the current room's exit that the user left to. For example, if
      // down is "Town Square", then the "Nexus" room object should have an exit of "down": "Town Square".
      let tempRoom = roomInfo[roomInfo[socket.currentRoom].exits[movement.direction].exit];
      socket.currentRoom = tempRoom.roomName;
      socket.join(socket.currentRoom);
      let room = {
        roomName: socket.currentRoom,
        desc: tempRoom.desc,
        exits: tempRoom.exits,
        items: tempRoom.items
      };
      let mobs = tempRoom.mobs ? tempRoom.mobs : null;
      let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
      .map(user => user.username);
      socket.emit('move', socket.currentRoom);
      socket.emit('generalMessage', {feedback: `You move ${movement.direction}.`, occupants, room, mobs});
    }
    socket.broadcast.to(socket.currentRoom).emit('movementArrive', {username: socket.username, direction: movement.direction});
  });
}
