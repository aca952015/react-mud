'use strict';

export default function mobTargetSelector(mobsInCombat, users) {
  for (let i = 0; i < mobsInCombat.length; i++) {
    let targets = mobsInCombat[i].combat.targets;
    let selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    let socket = users.find(user => user.username === selectedTarget);
    socket.emit('damage', {
      enemy: mobsInCombat[i],
      damage: mobsInCombat[i].atk
    });
    let mob = mobsInCombat[i];
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {feedback: `${mob.short} deals ${mob.atk} damage to ${socket.username}.`});
  }
}
