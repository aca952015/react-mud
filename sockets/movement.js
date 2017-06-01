'use strict';

export default function movement(socket, users, roomInfo) {
  socket.join('Nexus');
  socket.currentRoom = 'Nexus';

  socket.on('move', movement => {
    if (movement.direction !== 'login') {
      socket.broadcast.to(socket.currentRoom).emit('movementLeave', {username: socket.username, direction: movement.direction});
      socket.leave(socket.currentRoom);
      socket.join(movement.roomName);
      let tempRoom = roomInfo[roomInfo[socket.currentRoom].exits[movement.direction]];
      socket.currentRoom = tempRoom.roomName;
      let room = {
        roomName: socket.currentRoom,
        desc: tempRoom.desc,
        exits: tempRoom.exits,
        items: tempRoom.items
      };
      let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
      .map(user => user.username);
      socket.emit('generalMessage', {occupants, room});
    }
    socket.broadcast.to(socket.currentRoom).emit('movementArrive', {username: socket.username, direction: movement.direction});
  });

  socket.on('look', () => {
    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items
    };
    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);
    socket.emit('generalMessage', {occupants, room});
  });
}
