'use strict';

export default function enemyHealSkill(selectedSkill, mobInCombat, mobsInCombat, io) {
  const targets = mobsInCombat.filter(mob => mob.currentRoom === mobInCombat.currentRoom && mob.hp < mob.maxHP);
  const selectedTarget = targets[Math.floor(Math.random() * targets.length)];

  if (!selectedTarget) return;

  selectedSkill.cooldownRemaining = selectedSkill.cooldownTime;

  const damageStat = selectedSkill.skillTypes.includes('physical') ? 'atk' : 'mat';
  const multiplier = selectedSkill.skillTypes.includes('physical') ? 'atkMultiplier' : 'matMultiplier';
  const damage = ((mobInCombat[damageStat] * selectedSkill[multiplier]) + selectedSkill.addHealing);

  selectedTarget.hp += damage;
  if (selectedTarget.hp > selectedTarget.maxHP) selectedTarget.hp = selectedTarget.maxHP;

  io.sockets.to(mobInCombat.currentRoom).emit('generalMessage', {combatLog: {
    from: {
      enemy: `${mobInCombat.short[0].toUpperCase()}${mobInCombat.short.slice(1)}`
    },
    pre: selectedSkill.roomEcho,
    damage,
    post: selectedSkill.postMessage,
    target: {
      enemy: selectedTarget.id === mobInCombat.id ? 'themself' : selectedTarget.short
    },
    punctuation: '.'
  }});
}
