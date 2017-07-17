'use strict';

import {startCooldown} from '../actions/skill-actions.js';
import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function skillHandler(skill, args, props) {
  if (!props.combat.active) return {funcsToCall: [newMessage], feedback: 'You aren\'t in combat.'};
  let enemy;
  if (!args) enemy = props.combat.targets[Math.floor(Math.random() * props.combat.targets.length)];
  if (args) enemy = termsProcessor(props.combat.targets, args.split('.'));
  if (!enemy && args) return {funcsToCall: [newMessage], feedback: 'You don\'t appear to be fighting that.'};

  let equipmentAtk = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot] && props.equipment[slot].stats.atk) acc += props.equipment[slot].stats.atk;
    return acc;
  }, 0);
  let damage = (Math.round((props.atk + equipmentAtk) * skill.atkMultiplier) + skill.addDamage) - enemy.def;
  if (damage < 1) damage = 1;

  return {
    funcsToCall: [startCooldown, newMessage],
    skillName: skill.skillName,
    emitType: 'skill',
    damage,
    enemy,
    cooldownTimer: skill.cooldownTimer ? skill.cooldownTimer : undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      pre: skill.roomEcho,
      damage,
      post: ' damage to ',
      target: {
        enemy: enemy.short
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      pre: skill.playerEcho,
      damage,
      post: ' damage to ',
      target: {
        enemy: enemy.short
      },
      punctuation: '.'
    }
  };
}
