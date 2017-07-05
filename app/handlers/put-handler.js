'use strict';

import {newMessage} from '../actions/message-actions.js';
import {addToContainer, putAll} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function putHandler(command, args, props) {
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (splitArgs.length > 2) splitArgs.splice(1, 1);
  if (!args || splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'};

  let dotNotation = splitArgs[0].split('.');

  let putItem = termsProcessor(props.inventory, dotNotation);
  if (!putItem) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};

  dotNotation = splitArgs[1].split('.');

  let target = termsProcessor(props.inventory, dotNotation);

  if (target && !target.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};
  if (target && !target.container.holds.includes(putItem.type)) return {funcsToCall: [newMessage], feedback: 'That container doesn\'t hold that type of item.'};
  if (target && target.id === putItem.id) return {funcsToCall: [newMessage], feedback: 'You can\'t put a container inside itself.'};

  let validItems = splitArgs[0] === 'all' ? props.inventory.filter(item => item !== target) : null;

  if (target) {
    if (validItems) {
      return {
        emitType: 'putAllInInventoryContainer',
        itemArray: validItems,
        container: target,
        funcsToCall: [newMessage, putAll],
        feedback: `You put everything you can into ${target.short}.`
      };
    }
    return {
      emitType: 'putInContainer',
      item: putItem,
      container: target,
      funcsToCall: [newMessage, addToContainer],
      feedback: `You put ${putItem.short} in ${target.short}.`
    };
  }
  return {
    emitType: validItems ? 'putAllInRoomContainer' : 'put',
    item: putItem,
    itemArray: validItems ? validItems : null,
    container: splitArgs[1]
  };
}
