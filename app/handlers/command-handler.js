'use strict';

import communicationHandler from './communication-handler.js';
import movementHandler from './movement-handler.js';
import lookHandler from './look-handler.js';
import getHandler from './get-handler.js';
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

  const helperFunctions = {
    'say': communicationHandler,
    'whisper': communicationHandler,
    'east': movementHandler,
    'north': movementHandler,
    'west': movementHandler,
    'south': movementHandler,
    'up': movementHandler,
    'down': movementHandler,
    'look': lookHandler,
    'who': {emitType: 'who'},
    'get': getHandler,
    'inventory': {funcsToCall: [newMessage], inventory: props.inventory}
  };

  if (helperFunctions[command]) {
    if (typeof(helperFunctions[command]) === 'object') return helperFunctions[command];
    return helperFunctions[command](command, args, socket, props);
  }

  return {
    funcsToCall: [newMessage],
    text: 'I\'m not sure what you\'re trying to do.'
  };
}
