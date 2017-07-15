'use strict';

export function startCooldown(skillName) {
  return {
    type: 'ON_COOLDOWN',
    payload: skillName
  };
}

export function endCooldown(skillName) {
  return {
    type: 'OFF_COOLDOWN',
    payload: skillName
  };
}

export function setSkills(classSkills) {
  return {
    type: 'SET_SKILLS',
    payload: classSkills
  };
}
