'use strict';

import {newMessage} from '../actions/message-actions.js';
import {addToContainer} from '../actions/inventory-actions.js';

export default function putHandler(command, args, socket, props) {
  let splitArgs = args.split(' ');
  if (splitArgs.length > 2) splitArgs.splice(1, 1);
  if (splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'};

  let dotNotation = splitArgs[0].split('.');
  let putItem = dotNotation.length > 1 ? props.inventory.filter(item => item.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                         props.inventory.find(item => item.terms.includes(splitArgs[0]));
  if (!putItem) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};

  dotNotation = splitArgs[1].split('.');
  let target = dotNotation.length > 1 ? props.inventory.filter(item => item.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                        props.inventory.find(item => item.terms.includes(splitArgs[1]));
  if (target) {
    return {
      emitType: 'put',
      item: putItem,
      target,
      funcsToCall: [newMessage, addToContainer],
      feedback: `You put ${putItem.short} in ${target.short}.`
    };
  }
  return {
    emitType: 'put',
    item: putItem,
    target: splitArgs[1]
  };
}
