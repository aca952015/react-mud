'use strict';

import {newMessage} from '../actions/message-actions.js';
import {dropItem} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function dropHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Drop what?'};
  args = args.toLowerCase();

  let droppedItem = termsProcessor(props.inventory, args.split('.'));
  if (!droppedItem) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};
  return {
    emitType: 'drop',
    item: droppedItem,
    funcsToCall: [newMessage, dropItem],
    feedback: `You drop ${droppedItem.short}.`
  };
}
