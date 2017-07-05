'use strict';

import termsProcessor from '../processors/terms-processor.js';
import swapEquipmentProcessor from '../processors/swap-equipment-processor.js';
import {newMessage} from '../actions/message-actions.js';
import {wearEquipment} from '../actions/item-actions.js';
import {dropItem} from '../actions/inventory-actions.js';

export default function wearHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Wear what?'};
  args = args.toLowerCase();

  if (args === 'all') {
    const validEquipment = props.inventory.reduce((acc, item) => {
      if (item.slot && !acc.find(_item => _item.name === item.name)) acc.push(item);
      return acc;
    }, []);
    if (!validEquipment) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying anything to wear.'};

    validEquipment.forEach(item => {
      const result = props.equipment[item.slot] ? swapEquipmentProcessor(item, props.equipment[item.slot]) : generateWearObj(item);

      result.funcsToCall.forEach(func => props.dispatch(func(result)));
      props.socket.emit(result.emitType, result);
    });

    return {};
  }

  const equip = termsProcessor(props.inventory, args.split('.'));

  if (!equip) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying that.'};
  if (!equip.slot) return {funcsToCall: [newMessage], feedback: 'You can\'t wear that.'};

  if (props.equipment[equip.slot]) {
    const result = swapEquipmentProcessor(equip, props.equipment[equip.slot]);

    result.funcsToCall.forEach(func => props.dispatch(func(result)));
    props.socket.emit(result.emitType, result);

    return {};
  }

  return generateWearObj(equip);
}

function generateWearObj(equip) {
  return {
    funcsToCall: [wearEquipment, newMessage, dropItem],
    equip,
    item: equip,
    feedback: `You equip ${equip.short} on your ${equip.slot}.`,
    emitType: 'wearItem'
  };
}
