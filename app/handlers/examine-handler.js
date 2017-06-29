'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function examineHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Examine what?'};
  args = args.toLowerCase();
  let foundItem = termsProcessor(props.inventory, args.split('.'));

  if (!foundItem) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  return {funcsToCall: [newMessage], feedback: foundItem.description};
}
