'use strict';

import bcrypt from 'bcryptjs';

export const initialState = {
  creatingNew: false,
  creationStep: 0,
  newUsername: 'default',
  firstPassword: 'default'
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'CHARACTER_COMPLETE': return {...state, creatingNew: false, firstPassword: 'default'};
    case 'INCREMENT_CREATION_STEP': return {...state, creationStep: state.creationStep + 1};
    case 'NEW_CHARACTER': return {...state, creatingNew: true};
    case 'SET_CREATION_STEP': return {...state, creationStep: action.payload};
    case 'SET_FIRST_PASSWORD': {
      return {
        ...state,
        firstPassword: bcrypt.hashSync(action.payload, 10)
      };
    }
    case 'SET_USERNAME': return {...state, newUsername: action.payload};
    default: return state;
  }
}
