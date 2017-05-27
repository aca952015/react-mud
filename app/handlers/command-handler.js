'use strict';

import communicationHandler from './communication-handler.js';
import movementHandler from './movement-handler.js';
import lookHandler from './look-handler.js';
import {newMessage} from '../actions/message-actions.js';

export default function commandHandler(command, args, props, socket) {
  const commandShorthand = {
    'e': 'east',
    'w': 'west',
    'n': 'north',
    's': 'south',
    'd': 'down',
    'u': 'up',
    'l': 'look'
  };

  if (commandShorthand[command]) command = commandShorthand[command];

  if (command === 'say' || command === 'whisper') {
    if (command === 'say' && !args) return {funcToCall: newMessage, text: 'Say what?'};
    if (command === 'whisper' && args.split(' ').length === 1) return {funcToCall: newMessage, text: 'Whisper what to whom? (format: whisper <target> <message>)'};
    return communicationHandler(command, props, args);
  }
  if (command === 'east' || command === 'north' || command === 'south' || command === 'west' || command === 'up' || command === 'down') {
    return movementHandler(command, socket);
  }
  if (command === 'look') return lookHandler(socket);
  if (command === 'who') return {emitType: 'who'};
  return {
    funcToCall: newMessage,
    text: 'I\'m not sure what you\'re trying to do.'
  };
}
