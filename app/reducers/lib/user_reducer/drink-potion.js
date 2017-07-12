'use strict';

export default function drinkPotion(state, action) {
  let newState = {...state};
  let stat = state[action.payload.statToChange];
  let maxStat = null;
  if (stat) { // In the future, potions might not affect stats
    maxStat = `max${action.payload.statToChange.toUpperCase()}`;
    stat += action.payload.amount;
    // If the restoration goes over the max, set the current to the max.
    // For example, 15/20 HP plus 10 HP should be 20/20 HP, not 25/20.
    if (stat > state[maxStat]) stat = state[maxStat];
    newState[action.payload.statToChange] = stat;
  }
  return newState;
}
