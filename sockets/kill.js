'use strict';

export default function kill(socket, roomData) {
  socket.on('kill', targetObject => {
    if (!targetObject.target) return socket.emit('generalMessage', {feedback: 'Kill what?'});
    let splitArgs = targetObject.target.split('.');
    let target = splitArgs.length > 1 ? roomData[socket.currentRoom].mobs.filter(mob => mob.terms.includes(splitArgs[1]))[splitArgs[0] - 1] :
                                        roomData[socket.currentRoom].mobs.find(mob => mob.terms.includes(targetObject.target));
    if (!target) return socket.emit('generalMessage', {feedback: 'I don\'t see that enemy here.'});
    socket.emit('enterCombat', target);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${socket.username} moves to attack ${target.short}.`});
    target.combat = {
      active: true,
      target: socket.username
    };
  });
}
