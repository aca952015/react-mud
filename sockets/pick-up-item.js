'use strict';

export default function pickUpItem(socket, roomData) {
  socket.on('pickUpItem', itemShort => {
    itemShort = itemShort.item;
    let index = 0;
    if (itemShort.split('.').length > 1) {
      index = itemShort.split('.')[0] - 1;
      itemShort = itemShort.split('.')[1];
    }
    let roomItems = roomData[socket.currentRoom].items;
    let tempItem = index > 0 ? roomItems.filter(_item => _item.terms.includes(itemShort.toLowerCase()))[index] :
                               roomItems.find(_item => _item.terms.includes(itemShort.toLowerCase()));
    if (!tempItem) return socket.emit('generalMessage', {feedback: 'I don\'t see that item here.'});
    let room = {
      item: tempItem,
      pickRoom: socket.currentRoom
    };
    socket.emit('itemPickedUp', room);
    socket.broadcast.to(socket.currentRoom).emit('pickUpItem', {room, from: socket.username});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(room.item), 1);
  });
}
