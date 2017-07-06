'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';
import {quietlyAddItem} from '../actions/inventory-actions.js';
import {removeItem} from '../actions/item-actions.js';

export default function removeHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Remove what?'};
  args = args.toLowerCase();

  let equips = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot]) acc.push(props.equipment[slot]);
    return acc;
  }, []);

  if (args === 'all') {
    if (!equips.length) return {funcsToCall: [newMessage], feedback: 'You aren\'t wearing anything to remove.'};
    equips.forEach(item => {
      let result = generateRemoveObject(item);

      result.funcsToCall.forEach(func => props.dispatch(func(result)));
      props.socket.emit(result.emitType, result);
    });

    return {};
  }

  let item = termsProcessor(equips, args.split('.'));
  if (!item) return {funcsToCall: [newMessage], feedback: 'You aren\'t wearing that.'};

  return generateRemoveObject(item);
}

function generateRemoveObject(item) {
  return {
    funcsToCall: [quietlyAddItem, removeItem, newMessage],
    emitType: 'removeItem',
    quietAdd: item,
    removeEquip: item,
    feedback: `You remove ${item.short}.`
  };
}
