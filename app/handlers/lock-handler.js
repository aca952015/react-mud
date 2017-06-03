'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function lockHandler(command, args, socket, props) {
  if (!args) {
    let text = 'Unlock what direction?';
    if (command === 'lock') text = 'Lock what direction?';
    return {funcsToCall: [newMessage], text};
  }

  return {
    emitType: 'lock',
    inventory: props.inventory,
    direction: args
  };
}
