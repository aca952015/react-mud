'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function lockHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], text: 'Unlock what direction?'};

  return {
    emitType: 'unlock',
    inventory: props.inventory,
    direction: args
  };
}
