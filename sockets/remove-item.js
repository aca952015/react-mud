'use strict';

// The server keeps track of each user's equipment for LOOK purposes.
export default function removeItem(socket) {
  socket.on('removeItem', item => {
    socket.equipment[item.removeEquip.slot] = null;
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      feedback: ` removes ${item.removeEquip.short}.`});
  });
}
