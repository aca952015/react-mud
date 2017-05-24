'use strict';

const initialState = {
  messages: []
};

export default function reducer(state=initialState, action) {
  if (action.type === 'NEW_MESSAGE') return {...state, messages: [...state.messages, action.payload]};
  return state;
}
