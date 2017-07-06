'use strict';

import {quietlyAddItem, dropItem} from '../actions/inventory-actions.js';
import {removeItem, wearEquipment} from '../actions/item-actions.js';
import {newMessage} from '../actions/message-actions.js';

export default function swapEquipmentProcessor(itemToEquip, itemToRemove) {
  // Change the itemToEquip's slot to the itemToEquip
  // Remove the itemToEquip from the user's inventory
  // Add the itemToRemove to the user's inventory
  return {
    funcsToCall: [quietlyAddItem, removeItem, wearEquipment, dropItem, newMessage],
    equip: itemToEquip,
    item: itemToEquip,
    quietAdd: itemToRemove,
    removeEquip: itemToRemove,
    feedback: `You swap ${itemToRemove.short} with ${itemToEquip.short}.`,
    emitType: 'swapEquips'
  };
}
