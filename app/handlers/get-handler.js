'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getFromContainer} from '../actions/inventory-actions.js';

export default function getHandler(command, args, socket, props) {
  if (!args) return {funcsToCall: [newMessage], feedback: 'Get what?'};
  let splitArgs = args.split(' ');
  if (splitArgs.length < 2) return {emitType: 'pickUpItem', item: args};
  if (splitArgs.length > 2) splitArgs.splice(1, 1);

  let dotNotation = splitArgs[1].split('.');
  let container = dotNotation.length > 1 ? props.inventory.filter(_container => _container.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                           props.inventory.find(_container => _container.terms.includes(splitArgs[1]));
  if (container) {
    if (!container.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};
    dotNotation = splitArgs[0].split('.');
    let item = dotNotation.length > 1 ? container.container.contains.filter(_item => _item.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                        container.container.contains.find(_item => _item.terms.includes(splitArgs[0]));
    if (!item) return {funcsToCall: [newMessage], feedback: 'I don\'t see that item in that container.'};
    return {
      emitType: 'getFromContainer',
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
