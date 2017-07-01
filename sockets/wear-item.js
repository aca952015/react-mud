'use strict';

export default function wearItem(socket) {
  socket.on('wearItem', item => {
    socket.equipment[item.equip.slot] = item.equip;
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      feedback: ` wears ${item.equip.short} on their ${item.equip.slot}.`});
  });
}
