'use strict';

export default function removeItem(socket) {
  socket.on('removeItem', item => {
    socket.equipment[item.equip.slot] = null;
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      feedback: ` removes ${item.equip.short}.`});
  });
}
