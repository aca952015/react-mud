'use strict';

export const initialState = {
  head: null,
  shoulders: null,
  'main hand': null,
  'off hand': null,
  chest: null,
  legs: null,
  feet: null
};

export default function reducer(state=initialState, action) {
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
  return state;
}
