'use strict';

export function newMessage(message) {
  return {
    type: 'NEW_MESSAGE',
    payload: message
  };
}

export function updateCommandIndex(value) {
  return {
    type: 'UPDATE_COMMAND_INDEX',
    payload: value
  };
}

export function updateInput(value) {
  return {
    type: 'UPDATE_INPUT',
    payload: value
  };
}

export function updatePrevCommands(value) {
  return {
    type: 'UPDATE_PREV_COMMANDS',
    payload: value
  };
}

export function truncatePrevCommands() {
  return {type: 'TRUNCATE_PREV_COMMANDS'};
}
