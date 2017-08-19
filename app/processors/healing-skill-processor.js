'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown} from '../actions/skill-actions.js';
import {changeStat} from '../actions/user-actions.js';
import termsProcessor from './terms-processor.js';
import equipmentStatProcessor from './equipment-stat-processor.js';

export default function healingSkillProcessor(skill, args, props) {
  if (props[skill.cost.stat] < skill.cost.value) return {funcsToCall: [newMessage], feedback: `You don't have enough ${skill.cost.stat.toUpperCase()} to use that.`};
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

  const returnObj = {
    funcsToCall: [],
    statToChange: 'sp',
    amount: -(skill.generateSP),
    skillName: skill.skillName,
    skillCost: skill.cost,
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

  if (target === props.username) {
    props.dispatch(changeStat({
      statToChange: skill.cost.stat,
      amount: skill.cost.value
    }));
    returnObj.funcsToCall.push(startCooldown);
    returnObj.funcsToCall.push(changeStat);
  }

  return returnObj;
}
