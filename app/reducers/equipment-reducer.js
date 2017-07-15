'use strict';

export default function reducer(state={}, action) {
  if (action.type === 'LOGIN_EQUIPMENT') return action.payload;
  if (action.type === 'WEAR_EQUIPMENT') {
    // Since we can't use rest spread operators to directly reference a variable
    // property, we create a copy and reference it that way.
    let newState = {...state};
    newState[action.payload.slot] = action.payload;
    return newState;
  }
  if (action.type === 'REMOVE_ITEM') {
    let newState = {...state};
    newState[action.payload.slot] = null;
    return newState;
  }
  return {...state};
}
