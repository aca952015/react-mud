'use strict';

import termsProcessor from '../app/processors/terms-processor.js';

export default function kill(socket, roomData, mobsInCombat) {
  socket.on('kill', targetObject => {
    if (!targetObject.target) return socket.emit('generalMessage', {feedback: 'Kill what?'});
    targetObject.target = targetObject.target.toLowerCase();
    let target = termsProcessor(roomData[socket.currentRoom].mobs, targetObject.target.split('.'));

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
