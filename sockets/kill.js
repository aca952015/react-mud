'use strict';

export default function kill(socket, roomData, mobsInCombat) {
  socket.on('kill', targetObject => {
    if (!targetObject.target) return socket.emit('generalMessage', {feedback: 'Kill what?'});
    targetObject.target = targetObject.target.toLowerCase();
    let splitArgs = targetObject.target.split('.');
    let regEx = splitArgs.length > 1 ? new RegExp(`^${splitArgs[1]}`) : new RegExp(`^${splitArgs[0]}`);

    let target;

    if (splitArgs.length > 1) {
      target = roomData[socket.currentRoom].mobs.filter(mob => {
        for (let i = 0; i < mob.terms.length; i++) {
          if (mob.terms[i].match(regEx)) return true;
        }
      })[splitArgs[0] - 1];
    } else {
      target = roomData[socket.currentRoom].mobs.find(mob => {
        for (let i = 0; i < mob.terms.length; i++) {
          if (mob.terms[i].match(regEx)) return true;
        }
      });
    }
    if (!target) return socket.emit('generalMessage', {feedback: 'I don\'t see that enemy here.'});
    socket.emit('enterCombat', target);
    target.combat = {
      active: true,
      targets: target.combat.targets.includes(socket.username) ? target.combat.targets : [...target.combat.targets, socket.username]
    };
    if (!mobsInCombat.find(mob => mob.id === target.id)) mobsInCombat.push(target);
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      combatLog: {
        from: {
          friendly: socket.username
        },
        interaction: ' moves to attack ',
        target: {
          enemy: target.short
        },
        punctuation: '.'
      }
    });
  });
}
