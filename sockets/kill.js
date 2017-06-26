'use strict';

export default function kill(socket, roomData, mobsInCombat) {
  socket.on('kill', targetObject => {
    if (!targetObject.target) return socket.emit('generalMessage', {feedback: 'Kill what?'});
    let splitArgs = targetObject.target.split('.');
    let target = splitArgs.length > 1 ? roomData[socket.currentRoom].mobs.filter(mob => mob.terms.includes(splitArgs[1]))[splitArgs[0] - 1] :
                                        roomData[socket.currentRoom].mobs.find(mob => mob.terms.includes(targetObject.target));
    if (!target) return socket.emit('generalMessage', {feedback: 'I don\'t see that enemy here.'});
    socket.emit('enterCombat', target);
    target.combat = {
      active: true,
      targets: [...target.combat.targets, socket.username]
    };
    if (!mobsInCombat.find(mob => mob.id === target.id)) mobsInCombat.push(target);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      combatLog: {
        from: socket.username,
        interaction: ' moves to attack ',
        target: `${target.short}.`
      }
    });
  });
}
