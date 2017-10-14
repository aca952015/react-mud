'use strict';

export default function decayItems(roomData, io) {
  Object.values(roomData).forEach(room => {
    const decayableItems = room.items.filter(item => item.decaying);
    decayableItems.forEach(item => {
      item.decayTimer--;
      if (item.decayTimer <= 0) {
        if (item.container) room.items = room.items.concat(item.container.contains);

        room.items.splice(room.items.indexOf(room.items.find(_item => _item.id === item.id)), 1);
        io.sockets.to(room.roomName).emit('generalMessage', {feedback: `${item.short[0].toUpperCase()}${item.short.slice(1)} crumbles into dust.`});
      }
    });
  });
}
