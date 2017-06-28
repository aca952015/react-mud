'use strict';

export default function give(socket, users) {
  socket.on('give', giveObj => {
    let target = users.find(user => user.username && user.username.toLowerCase() === giveObj.target.toLowerCase());
    if (!target || target.currentRoom !== socket.currentRoom) return socket.emit('generalMessage', {feedback: 'I don\'t see that person here.'});

    let room = {
      item: giveObj.item,
      pickRoom: socket.currentRoom
    };

    target.emit('itemPickedUp', room);
    socket.emit('generalMessage', {
      from: 'You',
      interaction: ` give ${giveObj.item.short} to `,
      target: target.username
    });
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      interaction: ` gives ${giveObj.item.short} to `,
      target: target.username
    });
  });
}
