'use strict';

import termsProcessor from '../processors/terms-processor.js';
import {newMessage} from '../actions/message-actions.js';
import {wearEquipment} from '../actions/item-actions.js';

export default function wearHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Wear what?'};
  args = args.toLowerCase();
  let equipment = termsProcessor(props.inventory, args.split('.'));

  if (!equipment) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!equipment.slot) return {funcsToCall: [newMessage], feedback: 'You can\'t wear that.'};

  return {
    funcsToCall: [wearEquipment, newMessage],
    equipment,
    feedback: `You equip ${equipment.short} on your ${equipment.slot}.`,
    emitType: 'wearItem'
  };
}
