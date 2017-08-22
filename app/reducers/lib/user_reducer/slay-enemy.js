'use strict';

export default function slayEnemy(state, action) {
  // Remove the enemy from the current combat array. If they are the last enemy,
  // remove the user from combat.
  const slainEnemy = state.combat.targets.find(enemy => enemy.id === action.payload.id);
  const prevTargets = state.combat.targets.slice(0, state.combat.targets.indexOf(slainEnemy));
  const endTargets = state.combat.targets.slice(state.combat.targets.indexOf(slainEnemy) + 1);
  const newTargets = prevTargets.concat(endTargets);
  if (!newTargets.length) return {...state, combat: {targets: [], active: false}};
  return {...state, combat: {targets: newTargets, active: true}};
}
