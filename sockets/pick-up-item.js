'use strict';

export default function pickUpItem(socket, roomData) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true
  };

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
    if (invalidTypes[tempItem.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    let room = {
      item: tempItem,
      pickRoom: socket.currentRoom
    };
    socket.emit('itemPickedUp', room);
    socket.broadcast.to(socket.currentRoom).emit('pickUpItem', {room, from: socket.username});
    roomData[socket.currentRoom].items.splice(roomData[socket.currentRoom].items.indexOf(room.item), 1);
  });

  socket.on('getFromContainer', getObj => {
    let dotNotation = getObj.container.split('.');
    let container = dotNotation.length > 1 ? roomData[socket.currentRoom].items.filter(item => item.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                             roomData[socket.currentRoom].items.find(item => item.terms.includes(getObj.container));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    dotNotation = getObj.item.split('.');
    let item = dotNotation.length > 1 ? container.container.contains.filter(_item => _item.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                        container.container.contains.find(_item => _item.terms.includes(getObj.item));
    if (!item) return socket.emit('generalMessage', {feedback: 'I don\'t see that item in that container.'});
    if (invalidTypes[item.type]) return socket.emit('generalMessage', {feedback: 'You can\'t pick that up.'});

    socket.emit('forceGet', item);
    socket.emit('generalMessage', {feedback: `You pick up ${item.short} from ${container.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` gets ${item.short} from ${container.short}.`});
  });
}
