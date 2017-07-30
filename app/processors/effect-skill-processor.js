'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown} from '../actions/skill-actions.js';
import {changeStat} from '../actions/user-actions.js';
import {addEffect} from '../actions/combat-actions.js';
import termsProcessor from './terms-processor.js';

export default function effectSkillProcessor(skill, args, props) {
  if (props[skill.cost.stat] < skill.cost.value) return {funcsToCall: [newMessage], feedback: `You don't have enough ${skill.cost.stat.toUpperCase()} to use that.`};
  let target;

  if (!args) target = props.username;
  else {
    target = termsProcessor(props.combat.targets, args.split('.'));
    if (target && !skill.skillTypes.includes('debuff')) return {funcsToCall: [newMessage], feedback: 'You can\'t use that on enemies.'};
    target = `${args[0].toUpperCase()}${args.slice(1).toLowerCase()}`;
    if (target.toLowerCase() === props.username.toLowerCase()) target = props.username;
  }

  const returnObj = {
    funcsToCall: [],
    statToChange: 'sp',
    effectName: skill.addEffect.effectName,
    effects: skill.addEffect.effects,
    amount: -(skill.generateSP),
    skillName: skill.skillName,
    skillCost: skill.cost,
    generateSP: -(skill.generateSP),
    emitType: 'skill',
    skillTypes: skill.skillTypes,
    enemy: target,
    cooldownTimer: skill.cooldownTimer ? skill.cooldownTimer : undefined,
    echoLog: {
      from: {
        friendly: props.username
      },
      interaction: skill.roomEcho,
      target: {
        friendly: target
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      interaction: skill.playerEcho,
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
    returnObj.funcsToCall.push(addEffect);
  }

  return returnObj;
}
