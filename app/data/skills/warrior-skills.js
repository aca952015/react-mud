'use strict';

export const warriorSkills = {
  slash: {
    skillName: 'slash',
    level: 1,
    cost: {
      stat: 'sp',
      value: 4
    },
    generateSP: 0,
    onCooldown: false,
    atkMultiplier: 1.5,
    matMultiplier: 0,
    addHealing: 0,
    addDamage: 0,
    playerEcho: ' quickly slash at your opponent, dealing ',
    roomEcho: ' quickly slashes at their opponent, dealing ',
    postMessage: ' damage to ',
    skillTypes: ['damage', 'physical']
  }
};
