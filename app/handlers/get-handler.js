'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getFromContainer, getAll} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function getHandler(command, args, props) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true
  };

  if (!args) return {funcsToCall: [newMessage], feedback: 'Get what?'};
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (splitArgs.length < 2) return {emitType: 'pickUpItem', item: args};
  if (splitArgs.length > 2) splitArgs.splice(1, 1);
  let dotNotation = splitArgs[1].split('.');

  let container = termsProcessor(props.inventory, dotNotation);
  if (container) {
    if (!container.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};
    if (splitArgs[0] === 'all') {
      if (!container.container.contains.length) return {funcsToCall: [newMessage], feedback: 'There\'s nothing in that container.'};
      let validItems = container.container.contains.filter(item => !invalidTypes[item.type]);
      if (!validItems.length) return {funcsToCall: [newMessage], feedback: 'There\'s nothing you can get in that container.'};
      return {
        emitType: 'getAllFromInventory',
        funcsToCall: [newMessage, getAll],
        itemArray: validItems,
        container,
        feedback: `You get everything you can from ${container.short}.`
      };
    }
    dotNotation = splitArgs[0].split('.');
    let item = termsProcessor(container.container.contains, dotNotation);
    if (!item) return {funcsToCall: [newMessage], feedback: 'I don\'t see that item in that container.'};
    if (invalidTypes[item.type]) return {funcsToCall: [newMessage], feedback: 'You can\'t pick that up.'};
    return {
      emitType: 'pickedFromInventory',
      funcsToCall: [newMessage, getFromContainer],
      item,
      container,
      feedback: `You get ${item.short} from ${container.short}.`
    };
  }

  return {
    emitType: 'getFromContainer',
    container: splitArgs[1],
    item: splitArgs[0]
  };
}
