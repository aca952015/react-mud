'use strict';

import termsProcessor from '../processors/terms-processor.js';
import swapEquipmentProcessor from '../processors/swap-equipment-processor.js';
import {newMessage} from '../actions/message-actions.js';
import {wearEquipment} from '../actions/item-actions.js';
import {dropItem} from '../actions/inventory-actions.js';

export default function wearHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Wear what?'};
  args = args.toLowerCase();

  // If the user enters WEAR ALL, filter out items in the inventory that are not equipment
  // and duplicates of the "same" item (e.g., a leather helm and a leather helm, even though
  // they have different IDs).
  if (args === 'all') {
    const validEquipment = props.inventory.reduce((acc, item) => {
      if (item.slot && !acc.find(_item => _item.name === item.name)) acc.push(item);
      return acc;
    }, []);
    if (!validEquipment.length) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying anything to wear.'};

    // For each item to wear, check if there's already something being worn. If so, swap the items. If not, wear the item.
    // Normally, the commandHandler would only call funcsToCall once, but since we need it called multiple times, we handle
    // the logic here and then return an empty object to commandHandler.
    validEquipment.forEach(item => {
      const result = props.equipment[item.slot] ? swapEquipmentProcessor(item, props.equipment[item.slot]) : generateWearObj(item);

      result.funcsToCall.forEach(func => props.dispatch(func(result)));
      props.socket.emit(result.emitType, result);
    });

    return {};
  }

  // If the user types WEAR <item> instead of WEAR ALL...
  const equip = termsProcessor(props.inventory, args.split('.'));

  if (!equip) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!equip.slot) return {funcsToCall: [newMessage], feedback: 'You can\'t wear that.'};

  // If they're already wearing something in that slot, swap the two items
  if (props.equipment[equip.slot]) return swapEquipmentProcessor(equip, props.equipment[equip.slot]);

  // If they're not wearing something in that slot, equip it
  return generateWearObj(equip);
}

function generateWearObj(equip) {
  // If the equip is equipment, it's armor. If it's not, it's a weapon. Use the right verb accordingly.
  return {
    funcsToCall: [wearEquipment, newMessage, dropItem],
    equip,
    item: equip,
    feedback: equip.type === 'equipment' ? `You equip ${equip.short} on your ${equip.slot}.` : `You equip ${equip.short} in your ${equip.slot}.`,
    emitType: 'wearItem'
  };
}
