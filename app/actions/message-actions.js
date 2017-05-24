'use strict';

export function newMessage(message) {
  return {
    type: 'NEW_MESSAGE',
    payload: message
  };
}

export function newWhisper(message) {
  return {
    type: 'NEW_WHISPER',
    payload: message
  };
}
