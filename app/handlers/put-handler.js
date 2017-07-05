'use strict';

import {newMessage} from '../actions/message-actions.js';
import {addToContainer, putAll} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function putHandler(command, args, props) {
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (splitArgs.length > 2) splitArgs.splice(1, 1);
  if (!args || splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'};

  let target = termsProcessor(props.inventory, splitArgs[1].split('.'));
  if (target && !target.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};

  let argumentOfAll = splitArgs[0] === 'all';
  let validItems = argumentOfAll && target ? props.inventory.filter(item => item !== target) : null;
  if (validItems && validItems.length < 1) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying anything to put in that container.'};

  if (validItems) {
    return {
      emitType: 'putAllInInventoryContainer',
      itemArray: validItems,
      container: target,
      funcsToCall: [newMessage, putAll],
      feedback: `You put everything you can into ${target.short}.`
    };
  }

  let putItem = argumentOfAll ? 'all' : termsProcessor(props.inventory, splitArgs[0].split('.'));
  if (!putItem) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};
  if (target && !argumentOfAll && !target.container.holds.includes(putItem.type)) return {funcsToCall: [newMessage], feedback: 'That container doesn\'t hold that type of item.'};
  if (target && !argumentOfAll && target.id === putItem.id) return {funcsToCall: [newMessage], feedback: 'You can\'t put a container inside itself.'};

  if (target && !argumentOfAll) {
    return {
      emitType: 'putInContainer',
      item: putItem,
      container: target,
      funcsToCall: [newMessage, addToContainer],
      feedback: `You put ${putItem.short} in ${target.short}.`
    };
  }
  if (!target && argumentOfAll) {
    return {
      emitType: 'putAllInRoomContainer',
      itemArray: props.inventory,
      container: splitArgs[1]
    };
  }
  return {
    emitType: 'put',
    item: putItem,
    container: splitArgs[1]
  };
}
