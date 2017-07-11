'use strict';

import bcrypt from 'bcrypt';

export const initialState = {
  creatingNew: false,
  creationStep: 0,
  newUsername: 'default',
  firstPassword: 'default'
};

export default function reducer(state=initialState, action) {
  if (action.type === 'NEW_CHARACTER') return {...state, creatingNew: true};
  if (action.type === 'SET_USERNAME') return {...state, newUsername: action.payload};
  if (action.type === 'SET_FIRST_PASSWORD') {
    return {
      ...state,
      firstPassword: bcrypt.hashSync(action.payload, 10)
    };
  }
  if (action.type === 'SET_CREATION_STEP') return {...state, creationStep: action.payload};
  if (action.type === 'CHARACTER_COMPLETE') return {...state, creatingNew: false, firstPassword: 'default'};
  if (action.type === 'INCREMENT_CREATION_STEP') {
    const newStep = state.creationStep + 1;
    return {...state, creationStep: newStep};
  }
  return state;
}
