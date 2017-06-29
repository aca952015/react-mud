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

    let mobs = roomInfo[socket.currentRoom].mobs;

    if (args.target) {
      args.target = args.target.toLowerCase();
      let splitArgs = args.target.split('.');
      let regEx = splitArgs.length > 1 ? new RegExp(splitArgs[1]) : new RegExp(splitArgs[0]);
      let lookTarget;

      if (splitArgs.length > 1) {
        lookTarget = mobs.filter(mob => {
          for (let i = 0; i < mob.terms.length; i++) {
            if (mob.terms[i].match(regEx)) return true;
          }
        })[splitArgs[0] - 1];
      } else {
        lookTarget = mobs.find(mob => {
          for (let i = 0; i < mob.terms.length; i++) {
            if (mob.terms[i].match(regEx)) return true;
          }
        });
      }

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.short}.`});
        return showMeTheDescription(lookTarget);
      }

      if (splitArgs.length > 1) {
        lookTarget = room.items.filter(item => {
          for (let i = 0; i < item.terms.length; i++) {
            if (item.terms[i].match(regEx)) return true;
          }
        })[splitArgs[0] - 1];
      } else {
        lookTarget = room.items.find(item => {
          for (let i = 0; i < item.terms.length; i++) {
            if (item.terms[i].match(regEx)) return true;
          }
        });
      }

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.short}.`});
        return showMeTheDescription(lookTarget);
      }

      lookTarget = occupants.find(player => player.toLowerCase() === args.target);
      if (lookTarget) {
        let player = users.find(user => user.username === lookTarget);
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, interaction: ' looks at ', target: lookTarget});
        return showMeTheDescription(player);
      }

      if (room.examines) {
        lookTarget = room.examines.find(examine => {
          regEx = new RegExp(args.target.toLowerCase());
          for (let i = 0; i < examine.terms.length; i++) {
            if (examine.terms[i].match(regEx)) return true;
          }
        });
      }

      if (lookTarget) {
        socket.broadcast.to(socket.currentRoom).emit('generalMessage', {from: socket.username, feedback: ` looks at ${lookTarget.name}.`});
        return showMeTheDescription(lookTarget);
      }

      return socket.emit('generalMessage', {feedback: 'I don\'t see that here.'});
    }

    socket.emit('generalMessage', {occupants, room, mobs});
  });
}
