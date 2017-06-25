'use strict';

export function enterCombat(target) {
  return {
    type: 'ENTER_COMBAT',
    payload: target
  };
}

export function damageUser(damage) {
  return {
    type: 'DAMAGE_USER',
    payload: damage
  };
}

export function slayEnemy(target) {
  return {
    type: 'SLAY_ENEMY',
    payload: target
  };
}
