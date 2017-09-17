'use strict';

import equipmentStatsProcessor from '../app/processors/equipment-stat-processor.js';

export default function enemyDamageSkill(selectedSkill, mobInCombat, users, io) {
  const targets = mobInCombat.combat.targets;
  const selectedTarget = targets[Math.floor(Math.random() * targets.length)];
  const socket = users.find(user => user.username === selectedTarget);
  if (!socket) return;

  selectedSkill.cooldownRemaining = selectedSkill.cooldownTime;

  const defenseStat = selectedSkill.skillTypes.includes('physical') ? 'def' : 'mdf';
  const defense = equipmentStatsProcessor(socket.equipment)[defenseStat];
  const damageStat = selectedSkill.skillTypes.includes('physical') ? 'atk' : 'mat';
  const multiplier = selectedSkill.skillTypes.includes('physical') ? 'atkMultiplier' : 'matMultiplier';
  let damage = ((mobInCombat[damageStat] * selectedSkill[multiplier]) + selectedSkill.addDamage) - defense;
  if (damage < 1) damage = 1;

  io.sockets.to(socket.currentRoom).emit('generalMessage', {combatLog: {
    from: {
      enemy: `${mobInCombat.short[0].toUpperCase()}${mobInCombat.short.slice(1)}`
    },
    pre: selectedSkill.roomEcho,
    damage,
    post: selectedSkill.postMessage,
    target: {
      friendly: socket.username
    },
    punctuation: '.'
  }});
  socket.emit('damage', {damage});
}
