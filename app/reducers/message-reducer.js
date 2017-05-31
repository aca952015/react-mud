'use strict';

const initialState = {
  messages: [{
    roomName: 'Nexus',
    desc: 'Welcome to the nexus.',
    exits: {down: 'Town Square'},
    items: []
  }]
};

export default function reducer(state=initialState, action) {
  if (action.type === 'NEW_MESSAGE') return {...state, messages: [...state.messages, action.payload]};
  return state;
}
