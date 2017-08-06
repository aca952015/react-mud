'use strict';

export const clericSkills = {
  heal: {
    skillName: 'heal',
    level: 1,
    cost: {
      stat: 'mp',
      value: 4
    },
    generateSP: 3,
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
  'infusion': {
    skillName: 'infusion',
    level: 1,
    cost: {
      stat: 'mp',
      value: 3
    },
    generateSP: 3,
    onCooldown: false,
    atkMultiplier: 0,
    matMultiplier: 0,
    addHealing: 0,
    addDamage: 0,
    playerEcho: ' unleash a holy infusion of might towards ',
    roomEcho: ' unleashes a holy infusion of might towards ',
    skillTypes: ['effect', 'buff'],
    addEffect: {
      effectName: 'infusion',
      effects: {
        atk: 3,
        mat: 3,
        duration: 2
      },
      expirationMessage: 'You no longer feel a holy infusion of might.'
    }
  },
  'searing light': {
    skillName: 'searing light',
    level: 1,
    cost: {
      stat: 'sp',
      value: 5
    },
    generateSP: 0,
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
