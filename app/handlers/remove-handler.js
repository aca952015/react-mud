'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';
import {quietlyAddItem} from '../actions/inventory-actions.js';
import {removeItem} from '../actions/item-actions.js';

export default function removeHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Remove what?'};
  args = args.toLowerCase();

  // Get a list of only items that are actually equipped. For example, if
  // the user is only wearing a helm and boots, don't push undefined or null
  // into the array.
  let equips = Object.keys(props.equipment).reduce((acc, slot) => {
    if (props.equipment[slot]) acc.push(props.equipment[slot]);
    return acc;
  }, []);

  // If the argument is all, then the removeItem logic and emits need to be called for
  // each item. Since commandHandler typically only calls the funcsToCall once, we need
  // to handle the logic multiple times here and simply return an empty object.
  if (args === 'all') {
    if (!equips.length) return {funcsToCall: [newMessage], feedback: 'You aren\'t wearing anything to remove.'};
    equips.forEach(item => {
      let result = generateRemoveObject(item);

      result.funcsToCall.forEach(func => props.dispatch(func(result)));
      props.socket.emit(result.emitType, result);
    });

    return {};
  }

  // If the argument was a particular item, we can return the commandHandler object as normal.
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
