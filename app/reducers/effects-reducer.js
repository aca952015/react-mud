'use strict';

export default function reducer(state={}, action) {
  if (action.type === 'ADD_EFFECT') {
    let tempState = {...state};
    tempState[action.payload.effectName] = action.payload.effects;
    return tempState;
  }
  if (action.type === 'LOGIN_EFFECTS') return action.payload;
  if (action.type === 'REMOVE_EFFECT') {
    let tempState = {...state};
    delete tempState[action.payload];
    return tempState;
  }
  if (action.type === 'DECREMENT_EFFECT_DURATIONS') {
    const tempState = JSON.parse(JSON.stringify(state));
    for (let key in state) {
      let remainingDuration = state[key].duration;
      remainingDuration--;
      if (remainingDuration < 1) delete tempState[key];
      else tempState[key].duration = remainingDuration;
    }
    return tempState;
  }
  return {...state};
}
