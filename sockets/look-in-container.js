'use strict';

export default function lookInContainer(socket, roomData) {
  socket.on('lookInContainer', containerObj => {
    let splitArgs = containerObj.container.split('.');
    let container = splitArgs.length > 1 ? roomData[socket.currentRoom].items.filter(item => item.terms.includes(splitArgs[1]))[splitArgs[0] - 1] :
                                           roomData[socket.currentRoom].items.find(item => item.terms.includes(containerObj.container));
    if (!container) return socket.emit('generalMessage', {feedback: 'I don\'t see that container here.'});
    if (!container.container) return socket.emit('generalMessage', {feedback: 'That isn\'t a container.'});

    socket.emit('generalMessage', {containedItems: container.container.contains});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks in ${container.short}.`});
  });
}
