'use strict';

export default function give(socket, users) {
  socket.on('give', giveObj => {
    let target = users.find(user => user.username && user.username.toLowerCase() === giveObj.target.toLowerCase());
    if (!target || target.currentRoom !== socket.currentRoom) return socket.emit('generalMessage', {feedback: 'I don\'t see that person here.'});
    if (target.effects.death) return socket.emit('generalMessage', {feedback: 'You can\'t give things to ghosts.'});
    
    target.emit('forceGet', giveObj.item);
    socket.emit('forceDrop', giveObj.item);
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

  socket.on('giveAll', giveObj => {
    let target = users.find(user => user.username && user.username.toLowerCase() === giveObj.target.toLowerCase());
    if (!target || target.currentRoom !== socket.currentRoom) return socket.emit('generalMessage', {feedback: 'I don\'t see that person here.'});

    target.emit('getAll', {itemArray: giveObj.itemArray});
    socket.emit('forceDropAll');
    socket.emit('generalMessage', {interaction: 'You give everything you\'re carrying to ', target: target.username});
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      from: socket.username,
      interaction: ' gives everything they\'re carrying to ',
      target: target.username
    });
  });
}
