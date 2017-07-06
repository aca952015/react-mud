'use strict';

import swapEquipmentProcessor from '../../app/processors/swap-equipment-processor.js';
import {quietlyAddItem, dropItem} from '../../app/actions/inventory-actions.js';
import {removeItem, wearEquipment} from '../../app/actions/item-actions.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('swapEquipmentProcessor', () => {
  it('should return a swap object referencing the item to equip and item to remove', () => {
    const equipThis = {short: 'Wear me'};
    const removeThis = {short: 'Remove me'};
    expect(swapEquipmentProcessor(equipThis, removeThis)).toEqual(
      {
        funcsToCall: [quietlyAddItem, removeItem, wearEquipment, dropItem, newMessage],
        equip: equipThis,
        item: equipThis,
        quietAdd: removeThis,
        removeEquip: removeThis,
        feedback: `You swap ${removeThis.short} with ${equipThis.short}.`,
        emitType: 'swapEquips'
      }
    );
  });
});
