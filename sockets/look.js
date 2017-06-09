'use strict';

export default function look(socket, users, roomInfo) {
  socket.on('look', args => {
    function showMeTheDescription(target) {
      socket.emit('generalMessage', {text: target.description});
    }

    if (args.target) args.target = args.target.toLowerCase();

    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    let lookTarget = room.items.find(item => item.terms.includes(args.target));
    if (lookTarget) {
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, text: ` looks at ${lookTarget.short}.`});
      return showMeTheDescription(lookTarget);
    }

    lookTarget = occupants.find(player => player.toLowerCase() === args.target);
    if (lookTarget) {
      let player = users.find(user => user.username === lookTarget);
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, lookType: ' looks at ', text: ' ', target: lookTarget});
      return showMeTheDescription(player);
    }

    lookTarget = room.examines ? room.examines.find(examine => examine.terms.includes(args.target)) : null;
    if (lookTarget) {
      socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, text: ` looks at ${lookTarget.name}.`});
      return showMeTheDescription(lookTarget);
    }

    if (!args.target) return socket.emit('generalMessage', {occupants, room});
    return socket.emit('generalMessage', {text: 'I don\'t see that here.'});
  });
}
