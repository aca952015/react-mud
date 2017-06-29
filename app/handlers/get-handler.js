'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getFromContainer} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function getHandler(command, args, socket, props) {
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
