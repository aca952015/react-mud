'use strict';

import {startCooldown} from '../actions/skill-actions.js';
import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function skillHandler(skill, args, props) {
  if (!props.combat.active && skill.skillTypes.includes('damage')) return {funcsToCall: [newMessage], feedback: 'You aren\'t in combat.'};
  let target;
  // If the user doesn't specify a target, the target is a random enemy if it's an offensive skill
  // or the user if it's a defensive skill
  if (!args) {
    target = props.combat.targets[Math.floor(Math.random() * props.combat.targets.length)];
    if (skill.skillTypes.includes('healing')) target = props.username;
  }

  // If the user specifies a target, look for the target in current enemies first.
  // If one isn't found and it is a defensive ability, check if the target is the user.
  // If so, the target is "yourself."
  // If not, the server needs to check the room for the target.
  // If one isn't found and it isn't a defensive ability, then the target doesn't
  // exist and there should be an error.
  if (args) {
    target = termsProcessor(props.combat.targets, args.split('.'));
    if (target && skill.skillTypes.includes('healing')) return {funcsToCall: [newMessage], feedback: 'You can\'t heal enemies.'};
    if (!target) {
      if (skill.skillTypes.includes('healing')) {
        target = `${args[0].toUpperCase()}${args.slice(1).toLowerCase()}`;
        if (target.toLowerCase() === props.username.toLowerCase()) target = props.username;
      }
      else return {funcsToCall: [newMessage], feedback: 'You don\'t appear to be fighting that.'};
    }
  }

  // Calculate the amount of ATK bonuses from currently equipped items
  const equipmentAtk = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot] && props.equipment[slot].stats.atk) acc += props.equipment[slot].stats.atk;
    return acc;
  }, 0);

  // Calculate the amount of MAT bonuses from currently equipped items
  const equipmentMat = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot] && props.equipment[slot].stats.mat) acc += props.equipment[slot].stats.mat;
    return acc;
  }, 0);

  // Damage is equipment bonuses plus base ATK multipled by the skill's atk multiplier, added to the skill's
  // flat bonus, minus the target's def.
  // Magic abilities work the same way, except with MAT, but target MDF should not be factored in to friendly
  // targets (since it will be a heal if it's targeting a friendly).
  let damage = (Math.round((props.atk + equipmentAtk) * skill.atkMultiplier) + skill.addDamage) - target.def;
  let matDamage = (Math.round(props.mat + equipmentMat) * skill.matMultiplier + skill.addHealing);
  if (skill.skillTypes.includes('damage')) {
    matDamage -= target.mdf;

    // If the skill is offensive, it can't deal less than 1 damage
    if (damage < 1) damage = 1;
    if (matDamage < 1) matDamage = 1;
  }

  // If the skill is a heal, then it "deals negative damage" to the target.
  if (skill.skillTypes.includes('healing')) damage = -(Math.abs(matDamage));
  if (skill.skillTypes.includes('damage') && skill.skillTypes.includes('magical')) damage = matDamage;

  // Figure out if the target object needs to be friendly or enemy for display purposes
  const targetEnemyOrFriendly = {};
  if (skill.skillTypes.includes('damage')) targetEnemyOrFriendly.enemy = target.short;
  if (skill.skillTypes.includes('healing')) targetEnemyOrFriendly.friendly = target;

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
      target: targetEnemyOrFriendly,
      punctuation: '.'
    },
    combatLog: {
      from: {
        friendly: 'You'
      },
      pre: skill.playerEcho,
      damage,
      post: skill.postMessage,
      target: targetEnemyOrFriendly,
      punctuation: '.'
    }
  };
}
