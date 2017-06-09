'use strict';

export default function look(socket, users, roomInfo) {
  socket.on('look', args => {
    function showMeTheDescription(target) {
      socket.emit('generalMessage', {text: target.description});
    }

    if (args) args = args.target.toLowerCase();
    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    if (!args) return socket.emit('generalMessage', {occupants, room});

    let lookTarget = room.items.find(item => item.terms.includes(args));
    if (lookTarget) return showMeTheDescription(lookTarget);

    lookTarget = occupants.find(player => player.toLowerCase() === args);
    if (lookTarget) {
      let player = users.find(user => user.username === lookTarget);
      player.emit('generalMessage', {from: socket.username, text: ' ', commType: ' looks at ', target: 'you'});
      return showMeTheDescription(player);
    }

    lookTarget = room.examines ? room.examines.find(examine => examine.terms.includes(args)) : null;
    if (lookTarget) return showMeTheDescription(lookTarget);

    return socket.emit('generalMessage', {text: 'I don\'t see that here.'});
  });
}
