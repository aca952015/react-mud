'use strict';

import {newMessage} from '../actions/message-actions.js';
import {addToContainer, putAll} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function putHandler(command, args, props) {
  args = args.toLowerCase(); // Check for case sensitivity
  let splitArgs = args.split(' ');
  if (splitArgs.length > 2) splitArgs.splice(1, 1); // If the command was "PUT <TARGET> IN <CONTAINER>", strip out IN
  if (!args || splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'};

  let target = termsProcessor(props.inventory, splitArgs[1].split('.'));
  if (target && !target.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};

  // If the user did "PUT ALL" in a container they're holding, don't let them put that container in itself.
  // If the only thing they're holding is the container they're trying to put all in, send an error feedback
  let argumentOfAll = splitArgs[0] === 'all';
  let validItems = argumentOfAll && target ? props.inventory.filter(item => item !== target) : null;
  if (validItems && validItems.length < 1) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying anything to put in that container.'};

  // If the user said "PUT ALL" and they are carrying the container (since validItems is only
  // not null if both are true), then return an object that will call the putAll action
  if (validItems) {
    return {
      emitType: 'putAllInInventoryContainer',
      itemArray: validItems,
      container: target,
      funcsToCall: [newMessage, putAll],
      feedback: `You put everything you can into ${target.short}.`
    };
  }

  // Check if the user has a particular item or if they said "ALL"
  let putItem = argumentOfAll ? 'all' : termsProcessor(props.inventory, splitArgs[0].split('.'));
  if (!putItem) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};

  // If the user is carrying a container, did not say ALL, but tried to put a container
  // inside itself or an item in a wrong container, send an error feedback.
  if (target && !argumentOfAll && !target.container.holds.includes(putItem.type)) return {funcsToCall: [newMessage], feedback: 'That container doesn\'t hold that type of item.'};
  if (target && !argumentOfAll && target.id === putItem.id) return {funcsToCall: [newMessage], feedback: 'You can\'t put a container inside itself.'};

  // If the user is carrying a container, but did not say ALL, call the action
  // that will put the specified item in the container
  if (target && !argumentOfAll) {
    return {
      emitType: 'putInContainer',
      item: putItem,
      container: target,
      funcsToCall: [newMessage, addToContainer],
      feedback: `You put ${putItem.short} in ${target.short}.`
    };
  }

  // If the user is not carrying the container, but said ALL, put the entire inventory
  // in the container in the room.
  if (!target && argumentOfAll) {
    return {
      emitType: 'putAllInRoomContainer',
      itemArray: props.inventory,
      container: splitArgs[1]
    };
  }

  // If the user is not carrying the container, but specified an item, put the specified item
  // in the container in the room.
  return {
    emitType: 'put',
    item: putItem,
    container: splitArgs[1]
  };
}
