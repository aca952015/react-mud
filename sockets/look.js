'use strict';

export default function look(socket, users, roomInfo) {
  socket.on('look', args => {
    function showMeTheDescription(target) {
      socket.emit('generalMessage', {feedback: target.description});
    }

    let room = {
      roomName: socket.currentRoom,
      desc: roomInfo[socket.currentRoom].desc,
      exits: roomInfo[socket.currentRoom].exits,
      items: roomInfo[socket.currentRoom].items,
      examines: roomInfo[socket.currentRoom].examines ? roomInfo[socket.currentRoom].examines : null
    };

    let occupants = users.filter(user => user.username && user.currentRoom === socket.currentRoom && user.username !== socket.username)
    .map(user => user.username);

    if (args.target) {
      args.target = args.target.toLowerCase();

      let splitArgs = args.target.split('.');
      let lookTarget = splitArgs.length > 1 ?
                       room.items.filter(item => item.terms.includes(splitArgs[1]))[splitArgs[0] - 1] :
                       room.items.find(item => item.terms.includes(args.target));

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.short}.`});
        return showMeTheDescription(lookTarget);
      }

      lookTarget = occupants.find(player => player.toLowerCase() === args.target);
      if (lookTarget) {
        let player = users.find(user => user.username === lookTarget);
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, lookType: ' looks at ', feedback: ' ', target: lookTarget});
        return showMeTheDescription(player);
      }

      lookTarget = room.examines ? room.examines.find(examine => examine.terms.includes(args.target)) : null;
      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.name}.`});
        return showMeTheDescription(lookTarget);
      }

      return socket.emit('generalMessage', {feedback: 'I don\'t see that here.'});
    }

    socket.emit('generalMessage', {occupants, room});
  });
}
