'use strict';

// The server keeps track of a user's equipment for look purposes
export default function wearItem(socket) {
  socket.on('wearItem', item => {
    socket.equipment[item.equip.slot] = item.equip;

    // If it's equipment, it's armor. If not, it's a weapon. Use correct grammar accordingly.
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      feedback: item.type === 'equipment' ? ` equips ${item.equip.short} on their ${item.equip.slot}.`
                                          : ` equips ${item.equip.short} in their ${item.equip.slot}.`
    });
  });
}
