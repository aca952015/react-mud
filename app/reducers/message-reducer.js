'use strict';

export const initialState = {
  messages: [],
  input: '',
  prevCommands: [],
  commandIndex: 0
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'NEW_MESSAGE': {
      let messages = state.messages.concat(action.payload);
      if (messages.length > 50) messages = messages.slice(messages.length - 50);
      return {...state, messages};
    }
    case 'UPDATE_COMMAND_INDEX': return {...state, commandIndex: state.commandIndex + action.payload};
    case 'UPDATE_INPUT': return {...state, input: action.payload};
    case 'UPDATE_PREV_COMMANDS': return {...state, prevCommands: [...state.prevCommands, action.payload]};
    case 'TRUNCATE_PREV_COMMANDS': {
      const newCommands = state.prevCommands.concat();
      newCommands.shift();
      return {...state, prevCommands: newCommands};
    }
    default: return state;
  }
}
