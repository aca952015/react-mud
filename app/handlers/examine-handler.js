'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function examineHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Examine what?'};
  args = args.toLowerCase();
  let splitArgs = args.split('.');
  let index = splitArgs.length > 1 ? splitArgs[0] - 1 : 0;
  let foundItem = index > 0 ? props.inventory.filter(item => item.terms.includes(splitArgs[1]))[index] :
                              props.inventory.find(item => item.terms.includes(args));
  if (!foundItem) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  return {funcsToCall: [newMessage], feedback: foundItem.description};
}
