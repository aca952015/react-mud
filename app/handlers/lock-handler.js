'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function lockHandler(command, args, props) {
  if (!args) {
    let feedback = 'Unlock what direction?';
    if (command === 'lock') feedback = 'Lock what direction?';
    return {funcsToCall: [newMessage], feedback};
  }

  return {
    emitType: 'lock',
    inventory: props.inventory,
    direction: args.toLowerCase()
  };
}
