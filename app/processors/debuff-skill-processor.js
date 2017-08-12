'use strict';

import {newMessage} from '../actions/message-actions.js';
import {startCooldown} from '../actions/skill-actions.js';
import {changeStat} from '../actions/user-actions.js';
import termsProcessor from './terms-processor.js';

export default function debuffSkillProcessor(skill, args, props) {
  if (props[skill.cost.stat] < skill.cost.value) return {funcsToCall: [newMessage], feedback: `You don't have enough ${skill.cost.stat.toUpperCase()} to use that.`};
  if (!props.combat.active && skill.skillTypes.includes('debuff')) return {funcsToCall: [newMessage], feedback: 'You aren\'t in combat.'};
  let target;

  if (!args) target = props.combat.targets[Math.floor(Math.random() * props.combat.targets.length)];
  else {
    target = termsProcessor(props.combat.targets, args.split('.'));
    if (!target) return {funcsToCall: [newMessage], feedback: 'You don\'t appear to be fighting that.'};
  }

  props.dispatch(changeStat({
    statToChange: skill.cost.stat,
    amount: skill.cost.value
  }));

  return {
    funcsToCall: [startCooldown, changeStat],
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
        enemy: target.short
      },
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      interaction: skill.playerEcho,
      target: {
        enemy: target.short
      },
      punctuation: '.'
    }
  };
}
