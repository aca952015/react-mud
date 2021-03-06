'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown, refreshDuration} from '../actions/skill-actions.js';
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
    else {
      target = `${args[0].toUpperCase()}${args.slice(1).toLowerCase()}`;
      if (target.toLowerCase() === props.username.toLowerCase()) target = props.username;
    }
  }

  const returnObj = {
    funcsToCall: [],
    statToChange: 'sp',
    effectName: skill.addEffect.effectName,
    effects: skill.addEffect.effects,
    expirationMessage: skill.addEffect.expirationMessage,
    applyFunction: skill.applyFunction,
    expireFunction: skill.expireFunction,
    amount: -(skill.generateSP),
    skillName: skill.skillName,
    skillCost: skill.cost,
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

  // If the user is targeting themselves, then skill costs, cooldowns, stat changes,
  // and effects can all be handled client-side, with messages just being emitted
  // to others.
  if (target === props.username) {
    if (!props.effects[skill.addEffect.effectName]) {
      props.dispatch(changeStat({
        statToChange: skill.cost.stat,
        amount: skill.cost.value
      }));
      returnObj.funcsToCall.push(startCooldown);
      returnObj.funcsToCall.push(changeStat);
      returnObj.funcsToCall.push(addEffect);
      skill.applyFunction(props.dispatch);
    } else {
      if (props.effects[skill.addEffect.effectName].duration) {
        props.dispatch(refreshDuration({effectName: skill.addEffect.effectName, duration: skill.addEffect.effects.duration}));
      }
    }
  }

  return returnObj;
}
