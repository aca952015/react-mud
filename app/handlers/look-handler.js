'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function lookHandler(command, args, socket, props) {
  if (!args) return {emitType: 'look', target: args};
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (splitArgs[0] !== 'in') return {emitType: 'look', target: args};
  if (splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Look in what? (format: LOOK IN <container>)'};
  let dotNotation = splitArgs[1].split('.');

  let container = dotNotation.length > 1 ? props.inventory.filter(_container => _container.terms.includes(dotNotation[1]))[dotNotation[0] - 1] :
                                           props.inventory.find(_container => _container.terms.includes(splitArgs[1]));

  if (container) {
    if (!container.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};
    return {
      funcsToCall: [newMessage],
      containedItems: container.container.contains
    };
  }

  return {
    emitType: 'lookInContainer',
    container: splitArgs[1]
  };
}
