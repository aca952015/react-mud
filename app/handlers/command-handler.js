'use strict';

import communicationHandler from './communication-handler.js';
import movementHandler from './movement-handler.js';
import getHandler from './get-handler.js';
import dropHandler from './drop-handler.js';
import lockHandler from './lock-handler.js';
import lookHandler from './look-handler.js';
import giveHandler from './give-handler.js';
import putHandler from './put-handler.js';
import helpHandler from './help-handler.js';
import drinkHandler from './drink-handler.js';
import wearHandler from './wear-handler.js';
import examineHandler from './examine-handler.js';
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
    'inv': 'inventory',
    'ex': 'examine',
    'eq': 'equipment'
  };

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
    'drop': dropHandler,
    'unlock': lockHandler,
    'lock': lockHandler,
    'help': helpHandler,
    'drink': drinkHandler,
    'give': giveHandler,
    'inventory': {funcsToCall: [newMessage], inventory: props.inventory},
    'examine': examineHandler,
    'put': putHandler,
    'kill': {emitType: 'kill', target: args},
    'wear': wearHandler,
    'equipment': {funcsToCall: [newMessage], equipment: props.equipment}
  };

  if (commandShorthand[command]) command = commandShorthand[command];
  if (commandShorthand[args]) args = commandShorthand[args];

  if (helperFunctions[command]) {
    if (typeof(helperFunctions[command]) === 'object') return helperFunctions[command];
    return helperFunctions[command](command, args, socket, props);
  }

  return {
    funcsToCall: [newMessage],
    feedback: 'I\'m not sure what you\'re trying to do.'
  };
}
