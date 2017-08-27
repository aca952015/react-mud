'use strict';

import equipmentStatProcessor from '../app/processors/equipment-stat-processor.js';

export default function mobTargetSelector(mobsInCombat, users) {
  // For each mob in combat, select a random target from their current targets.
  // Emit a damage event to the target and a combatLog event to everyone else
  // in the room.
  for (let i = 0; i < mobsInCombat.length; i++) {
    const targets = mobsInCombat[i].combat.targets;
    const selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    const socket = users.find(user => user.username === selectedTarget);
    if (!socket) return;

    // Get the def stat of all equipped items and add them together
    const defense = equipmentStatProcessor(socket.equipment).def;
    
    // Mobs must do at least 1 damage
    let damage = mobsInCombat[i].atk - defense;
    if (damage < 1) damage = 1;

    socket.emit('damage', {
      enemy: mobsInCombat[i],
      damage
    });

    const mob = mobsInCombat[i];
    socket.broadcast.to(socket.currentRoom).emit('generalMessage', {
      combatLog: {
        from: {
          enemy: `${mob.short[0].toUpperCase()}${mob.short.slice(1)}`
        },
        pre: ' deals ',
        damage,
        post: ' damage to ',
        target: {
          friendly: socket.username
        },
        punctuation: '.'
      }
    });
  }
}
