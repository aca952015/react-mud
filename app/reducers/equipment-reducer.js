'use strict';

export default function reducer(state={}, action) {
  switch(action.type) {
    case 'LOGIN_EQUIPMENT': return action.payload;
    case 'REMOVE_ITEM': {
      const newState = {...state};
      newState[action.payload.slot] = null;
      return newState;
    }
    case 'WEAR_EQUIPMENT': {
      const newState = {...state};
      newState[action.payload.slot] = action.payload;
      return newState;
    }
    default: return state;
  }
}
