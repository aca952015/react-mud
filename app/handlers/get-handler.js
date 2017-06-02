'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function getHandler(command, args) {
  if (!args) return {funcsToCall: [newMessage], text: 'Get what?'};
  return {emitType: 'pickUpItem', item: args};
}
