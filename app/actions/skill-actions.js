'use strict';

export function startCooldown(skillName) {
  return {
    type: 'ON_COOLDOWN',
    payload: skillName.skillName
  };
}

export function endCooldown(skillName) {
  return {
    type: 'OFF_COOLDOWN',
    payload: skillName.skillName
  };
}

export function startGlobalCooldown() {
  return {type: 'START_GLOBAL_COOLDOWN'};
}

export function endGlobalCooldown() {
  return {type: 'END_GLOBAL_COOLDOWN'};
}

export function setSkills(classSkills) {
  return {
    type: 'SET_SKILLS',
    payload: classSkills
  };
}

export function decrementEffectDurations() {
  return {type: 'DECREMENT_EFFECT_DURATIONS'};
}

export function refreshDuration(skill) {
  return {
    type: 'REFRESH_DURATION',
    payload: {
      effectName: skill.effectName,
      duration: skill.duration
    }
  };
}
