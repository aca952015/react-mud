'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function lookHandler(command, args, socket, props) {
  if (!args) return {emitType: 'look', target: args};
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (splitArgs[0] !== 'in') return {emitType: 'look', target: args};
  if (splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Look in what? (format: LOOK IN <container>)'};
  let dotNotation = splitArgs[1].split('.');

  let container = termsProcessor(props.inventory, dotNotation);

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
