'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown} from '../actions/skill-actions.js';
import termsProcessor from './terms-processor.js';
import equipmentStatProcessor from './equipment-stat-processor.js';

export default function healingSkillProcessor(skill, args, props) {
  const funcsToCall = [];
  let target;

  if (!args) target = props.username;
  else {
    target = termsProcessor(props.combat.targets, args.split('.'));
    if (target) return {funcsToCall: [newMessage], feedback: 'You can\'t heal enemies.'};
    target = `${args[0].toUpperCase()}${args.slice(1).toLowerCase()}`;
    if (target.toLowerCase() === props.username.toLowerCase()) target = props.username;
  }
  
  let damage = Math.round((props.mat + equipmentStatProcessor(props.equipment).mat) * skill.matMultiplier) + skill.addHealing;
  if (damage < 1) damage = 1;

  damage = -(Math.abs(damage));

  if (target === props.username) funcsToCall.push(startCooldown);

  return {
    funcsToCall,
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
        friendly: target
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
        friendly: target
      },
      punctuation: '.'
    }
  };
}
