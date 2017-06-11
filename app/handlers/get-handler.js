'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function getHandler(command, args) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Get what?'};
  return {emitType: 'pickUpItem', item: args};
}
