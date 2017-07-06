'use strict';

export default function mobTargetSelector(mobsInCombat, users) {
  // For each mob in combat, select a random target from their current targets.
  // Emit a damage event to the target and a combatLog event to everyone else
  // in the room.
  for (let i = 0; i < mobsInCombat.length; i++) {
    let targets = mobsInCombat[i].combat.targets;
    let selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    let socket = users.find(user => user.username === selectedTarget);
    socket.emit('damage', {
      enemy: mobsInCombat[i],
      damage: mobsInCombat[i].atk
    });
    let mob = mobsInCombat[i];
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      combatLog: {
        from: {
          enemy: `${mob.short[0].toUpperCase()}${mob.short.slice(1)}`
        },
        pre: ' deals ',
        damage: mob.atk,
        post: ' damage to ',
        target: {
          friendly: socket.username
        },
        punctuation: '.'
      }
    });
  }
}
