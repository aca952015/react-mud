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
  return {...state};
}
