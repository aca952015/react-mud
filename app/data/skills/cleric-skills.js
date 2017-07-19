'use strict';

export const clericSkills = {
  heal: {
    skillName: 'heal',
    onCooldown: false,
    atkMultiplier: 0,
    matMultiplier: 1.5,
    addHealing: 0,
    addDamage: 0,
    playerEcho: ' emit a soothing blue aura, restoring  ',
    roomEcho: ' emits a soothing blue aura, restoring ',
    postMessage: ' health to ',
    skillTypes: ['healing', 'magical']
  },
  'searing light': {
    skillName: 'searing light',
    onCooldown: false,
    atkMultiplier: 0,
    matMultiplier: 1.5,
    addHealing: 0,
    addDamage: 3,
    playerEcho: ' conjure forth a burst of holy light, dealing ',
    roomEcho: ' conjures forth a burst of holy light, dealing ',
    postMessage: ' damage to ',
    skillTypes: ['damage', 'magical']
  }
};
