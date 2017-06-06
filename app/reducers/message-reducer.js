'use strict';

const initialState = {
  messages: [],
  input: '',
  prevCommands: [],
  commandIndex: 0
};

export default function reducer(state=initialState, action) {
  if (action.type === 'NEW_MESSAGE') return {...state, messages: [...state.messages, action.payload]};
  if (action.type === 'UPDATE_INPUT') return {...state, input: action.payload};
  if (action.type === 'UPDATE_COMMAND_INDEX') return {...state, commandIndex: state.commandIndex + action.payload};
  if (action.type === 'UPDATE_PREV_COMMANDS') return {...state, prevCommands: [...state.prevCommands, action.payload]};
  if (action.type === 'TRUNCATE_PREV_COMMANDS') {
    let newCommands = state.prevCommands;
    newCommands.shift();
    return {...state, prevCommands: newCommands};
  }
  return state;
}
