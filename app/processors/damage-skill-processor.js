'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown} from '../actions/skill-actions.js';
import termsProcessor from './terms-processor.js';
import equipmentStatProcessor from './equipment-stat-processor.js';

export default function damageSkillProcessor(skill, args, props) {
  if (!props.combat.active && skill.skillTypes.includes('damage')) return {funcsToCall: [newMessage], feedback: 'You aren\'t in combat.'};

  let target;

  if (args) {
    target = termsProcessor(props.combat.targets, args.split('.'));
    if (!target) return {funcsToCall: [newMessage], feedback: 'You don\'t appear to be fighting that.'};
  } else target = props.combat.targets[Math.floor(Math.random() * props.combat.targets.length)];

  const equipmentStats = equipmentStatProcessor(props.equipment);

  let damage = skill.skillTypes.includes('magical') ?
    (Math.round((props.mat + equipmentStats.mat) * skill.matMultiplier) + skill.addDamage) - target.mdf :
    (Math.round((props.atk + equipmentStats.atk) * skill.atkMultiplier) + skill.addDamage) - target.def;
  if (damage < 1) damage = 1;

  return {
    funcsToCall: [startCooldown],
    skillName: skill.skillName,
    emitType: 'skill',
    skillTypes: skill.skillTypes,
    damage,
    enemy: target,
    cooldownTimer: skill.cooldownTimer ? skill.cooldownTimer : undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      pre: skill.roomEcho,
      damage,
      post: skill.postMessage,
      target: {
        enemy: target.short
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      pre: skill.playerEcho,
      damage,
      post: skill.postMessage,
      target: {
        enemy: target.short
      },
      punctuation: '.'
    }
  };
}
