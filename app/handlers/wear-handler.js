'use strict';

import termsProcessor from '../processors/terms-processor.js';
import {newMessage} from '../actions/message-actions.js';
import {wearEquipment} from '../actions/item-actions.js';
import {dropItem} from '../actions/inventory-actions.js';

export default function wearHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Wear what?'};
  args = args.toLowerCase();
  let equip = termsProcessor(props.inventory, args.split('.'));

  if (!equip) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!equip.slot) return {funcsToCall: [newMessage], feedback: 'You can\'t wear that.'};

  return {
    funcsToCall: [wearEquipment, newMessage, dropItem],
    equip,
    item: equip,
    feedback: `You equip ${equip.short} on your ${equip.slot}.`,
    emitType: 'wearItem'
  };
}
