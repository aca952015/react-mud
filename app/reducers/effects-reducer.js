'use strict';

export default function reducer(state={}, action) {
  if (action.type === 'ADD_EFFECT') {
    let tempState = {...state};
    tempState[action.payload.effectName] = action.payload.effects;
    if (action.payload.expirationMessage) tempState[action.payload.effectName].expirationMessage = action.payload.expirationMessage;
    if (action.payload.expireFunction) tempState[action.payload.effectName].expireFunction = action.payload.expireFunction;
    return tempState;
  }
  if (action.type === 'LOGIN_EFFECTS') return action.payload;
  if (action.type === 'REFRESH_DURATION') {
    let tempState = JSON.parse(JSON.stringify(state));
    tempState[action.payload.effectName].duration = action.payload.duration;
    tempState[action.payload.effectName].expireFunction = state[action.payload.effectName].expireFunction;
    return tempState;
  }
  if (action.type === 'REMOVE_EFFECT') {
    let tempState = {...state};
    delete tempState[action.payload];
    return tempState;
  }
  if (action.type === 'DECREMENT_EFFECT_DURATIONS') {
    const tempState = JSON.parse(JSON.stringify(state));
    for (let key in state) {
      if (state[key].duration) {
        let remainingDuration = state[key].duration;
        remainingDuration--;
        if (remainingDuration < 1) delete tempState[key];
        else {
          tempState[key].expireFunction = state[key].expireFunction;
          tempState[key].duration = remainingDuration;
        }
      }
    }
    return tempState;
  }
  return {...state};
}
