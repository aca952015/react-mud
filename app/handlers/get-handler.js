'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getFromContainer, getAll} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function getHandler(command, args, props) {
  const invalidTypes = {
    'corpse': true,
    'liquid': true,
    'doodads': true
  };

  if (!args) return {funcsToCall: [newMessage], feedback: 'Get what?'};
  args = args.toLowerCase();

  // Get can take an optional argument for grammatical reasons, e.g. GET POTION FROM BACKPACK
  // Since we don't care about whatever word is used, we truncate it down to GET POTION BACKPACK
  // If the argument is GET <item> without specifying a container, then we simply return an object
  // that emits pickUpItem with the target for the server to handle. Otherwise, we need to check
  // if the player is trying to get from a container they're carrying, or a container in the room.
  let splitArgs = args.split(' ');
  if (splitArgs.length < 2) return {emitType: 'pickUpItem', item: args};
  if (splitArgs.length > 2) splitArgs.splice(1, 1);
  let dotNotation = splitArgs[1].split('.');

  let container = termsProcessor(props.inventory, dotNotation);

  // If container is not undefined, then it means the player has it in their inventory.
  if (container) {
    if (!container.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};

    // GET ALL <container> should disallow getting liquids or other item types that can't normally be picked up.
    // Otherwise, every item from the container should be removed and added to the player's inventory.
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

    // If GET <item> <container> is the case, make sure they aren't trying to get a liquid or something.
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

  // If the player is not carrying the container (container was undefined), then the server
  // needs to handle the get request for a container in the room.
  return {
    emitType: 'getFromContainer',
    container: splitArgs[1],
    item: splitArgs[0]
  };
}
