'use strict';

export default function tickRegen(state) {
  let currentHP = state.hp;
  let currentMP = state.mp;
  let divisor = state.combat.active ? 10 : 5;
  currentHP += Math.round(state.maxHP / divisor);
  currentMP += Math.round(state.maxMP / divisor);
  if (currentHP > state.maxHP) currentHP = state.maxHP;
  if (currentMP > state.maxMP) currentMP = state.maxMP;
  return {...state, hp: currentHP, mp: currentMP};
}
