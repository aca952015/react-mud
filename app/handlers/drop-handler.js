'use strict';

import {newMessage} from '../actions/message-actions.js';
import {dropItem} from '../actions/inventory-actions.js';

export default function dropHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], text: 'Drop what?'};
  let droppedItem = props.inventory.find(item => item.terms.includes(args.toLowerCase()));
  if (!droppedItem) return {funcsToCall: [newMessage], text: 'You don\'t seem to be carrying that.'};
  return {
    emitType: 'drop',
    item: droppedItem,
    funcsToCall: [newMessage, dropItem],
    text: `You drop ${droppedItem.short}.`
  };
}
