'use strict';

export function newMessage(message) {
  return {
    type: 'NEW_MESSAGE',
    payload: message
  };
}
