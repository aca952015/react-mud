'use strict';

export const initialState = {
  head: null,
  shoulders: null,
  chest: null,
  legs: null,
  feet: null
};

export default function reducer(state=initialState, action) {
  if (action.type === 'WEAR_EQUIPMENT') {
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
