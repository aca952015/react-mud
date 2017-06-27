'use strict';

export default function put(socket, roomData) {
  socket.on('put', putObj => {
    let splitArgs = putObj.container.split('.');
    let container = splitArgs.length > 1 ? roomData[socket.currentRoom].items.filter(item => item.terms.includes(splitArgs[1]))[splitArgs[0] - 1] :
                                           roomData[socket.currentRoom].items.find(item => item.terms.includes(putObj.container));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});
    if (!container.container.holds.includes(putObj.item.type)) return socket.emit('generalMessage', {feedback: 'That container doesn\'t hold that type of item.'});

    socket.emit('forceDrop', putObj.item);
    socket.emit('generalMessage', {feedback: `You put ${putObj.item.short} in ${container.short}.`});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} puts ${putObj.item.short} in ${container.short}.`});

    container.container.contains.push(putObj.item);
  });
}
