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
  },
  hobble: {
    skillName: 'hobble',
    level: 1,
    cost: {
      stat: 'mp',
      value: 3
    },
    generateSP: 4,
    onCooldown: false,
    atkMultiplier: 0,
    matMultiplier: 0,
    addHealing: 0,
    addDamage: 0,
    playerEcho: ' strike out and hobble ',
    roomEcho: ' strikes out and hobbles ',
    skillTypes: ['effect', 'debuff'],
    addEffect: {
      effectName: 'hobble',
      effects: {
        atk: -2,
        duration: 1
      }
    },
    applyFunction: function(target) {
      target.atk -= 2;
    },
    expireFunction: function(target) {
      target.atk += 2;
    }
  }
};
