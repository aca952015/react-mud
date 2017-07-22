'use strict';

export default function changeStat(state, action) {
  let currentStat = state[action.payload.statToChange] - action.payload.amount;
  let maxStat = state[`max${action.payload.statToChange.toUpperCase()}`];
  if (currentStat > maxStat) currentStat = maxStat;
  if (currentStat < 0) currentStat = 0;
  let newState = {...state};
  newState[action.payload.statToChange] = currentStat;
  return newState;
}
