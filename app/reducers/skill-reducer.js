'use strict';

export default function reducer(state={}, action) {
  if (action.type === 'ON_COOLDOWN') {
    let newState = {...state};
    newState[action.payload].onCooldown = true;
    return newState;
  }
  if (action.type === 'OFF_COOLDOWN') {
    let newState = {...state};
    newState[action.payload].onCooldown = false;
    return newState;
  }
  return {...state};
}
