'use strict';

import communicationHandler from './communication-handler.js';
import movementHandler from './movement-handler.js';
import lookHandler from './look-handler.js';
import getItemHandler from './get-item-handler.js';
import {newMessage} from '../actions/message-actions.js';

export default function commandHandler(command, args, props, socket) {
  const commandShorthand = {
    'e': 'east',
    'w': 'west',
    'n': 'north',
    's': 'south',
    'd': 'down',
    'u': 'up',
    'l': 'look',
    'i': 'inventory',
    'inv': 'inventory'
  };

  if (commandShorthand[command]) command = commandShorthand[command];

  if (command === 'say' || command === 'whisper') {
    if (command === 'say' && !args) return {funcsToCall: [newMessage], text: 'Say what?'};
    if (command === 'whisper' && args.split(' ').length === 1) return {funcsToCall: [newMessage], text: 'Whisper what to whom? (format: whisper <target> <message>)'};
    return communicationHandler(command, props, args);
  }
  if (command === 'east' || command === 'north' || command === 'south' || command === 'west' || command === 'up' || command === 'down') {
    return movementHandler(command, socket);
  }
  if (command === 'look') return lookHandler(socket);
  if (command === 'who') return {emitType: 'who'};
  if (command === 'get') {
    if (!args) return {funcsToCall: [newMessage], text: 'Get what?'};
    return getItemHandler(command, args, socket);
  }
  if (command === 'inventory') return {funcsToCall: [newMessage], inventory: props.inventory};
  return {
    funcsToCall: [newMessage],
    text: 'I\'m not sure what you\'re trying to do.'
  };
}
