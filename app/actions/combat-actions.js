'use strict';

export function enterCombat(target) {
  return {
    type: 'ENTER_COMBAT',
    payload: target
  };
}

export function slayEnemy(target) {
  return {
    type: 'SLAY_ENEMY',
    payload: target
  };
}

export function addEffect(effect) {
  return {
    type: 'ADD_EFFECT',
    payload: effect
  };
}

export function removeEffect(effect) {
  return {
    type: 'REMOVE_EFFECT',
    payload: effect
  };
}

export function fullRestore() {
  return {type: 'FULL_RESTORE'};
}

export function escapeCombat() {
  return {type: 'ESCAPE_COMBAT'};
}
