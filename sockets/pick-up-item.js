'use strict';

export default function pickUpItem(socket, roomData) {
  socket.on('pickUpItem', itemShort => {
    itemShort = itemShort.item;
    let roomItems = roomData[socket.currentRoom].items;
    let tempItem = roomItems.find(_item => _item.terms.includes(itemShort.toLowerCase()));
    if (!tempItem) return socket.emit('message', {text: 'I don\'t see that item here.'});
    let room = {
      item: tempItem,
      pickRoom: socket.currentRoom
    };
    socket.emit('itemPickedUp', room);
    socket.broadcast.to(socket.currentRoom).emit('pickUpItem', {room, from: socket.username});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(room.item), 1);
  });
}
