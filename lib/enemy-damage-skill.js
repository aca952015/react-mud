'use strict';

import equipmentStatsProcessor from '../app/processors/equipment-stat-processor.js';

export default function enemyDamageSkill(mobsInCombat, users, io) {
  for (let i = 0; i < mobsInCombat.length; i++) {
    const possibleSkills = Object.keys(mobsInCombat[i].skills);
    const chosenSkillName = possibleSkills[Math.floor(Math.random() * possibleSkills.length)];
    const selectedSkill = mobsInCombat[i].skills[chosenSkillName];
    if (!selectedSkill) return;
    if (selectedSkill.cooldownRemaining > 0) {
      selectedSkill.cooldownRemaining--;
      return;
    }

    const targets = mobsInCombat[i].combat.targets;
    const selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    const socket = users.find(user => user.username === selectedTarget);
    if (!socket) return;

    selectedSkill.cooldownRemaining = selectedSkill.cooldownTime;

    const defenseStat = selectedSkill.skillTypes.includes('physical') ? 'def' : 'mdf';
    const defense = equipmentStatsProcessor(socket.equipment)[defenseStat];
    const damageStat = selectedSkill.skillTypes.includes('physical') ? 'atk' : 'mat';
    const multiplier = selectedSkill.skillTypes.includes('physical') ? 'atkMultiplier' : 'matMultiplier';
    let damage = ((mobsInCombat[i][damageStat] * selectedSkill[multiplier]) + selectedSkill.addDamage) - defense;
    if (damage < 1) damage = 1;

    io.sockets.to(socket.currentRoom).emit('generalMessage', {combatLog: {
      from: {
        enemy: `${mobsInCombat[i].short[0].toUpperCase()}${mobsInCombat[i].short.slice(1)}`
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
}
