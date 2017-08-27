'use strict';

export default function teleport(socket, users, roomInfo) {
  socket.on('teleport', room => {
    socket.leave(socket.currentRoom);
    socket.join(room);
    socket.currentRoom = room;

    const roomData = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    // Check players in the room besides the player
    const occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => {
      if (user.effects.death) return `The ghost of ${user.username}`;
      return user.username;
    });

    const mobs = roomInfo[socket.currentRoom].mobs;

    socket.emit('generalMessage', {occupants, room: roomData, mobs});
  });
}
