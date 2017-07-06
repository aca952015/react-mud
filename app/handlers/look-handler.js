'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function lookHandler(command, args, props) {
  if (!args) return {emitType: 'look', target: args};
  args = args.toLowerCase();

  // The player could LOOK, LOOK <target>, or LOOK IN <container>
  // If no args, LOOK is processed by the server
  // If IN is not the first argument, LOOK <target> is processed by the server
  // If IN is the first argument, the player could be looking in a container they're carrying
  let splitArgs = args.split(' ');
  if (splitArgs[0] !== 'in') return {emitType: 'look', target: args};
  if (splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Look in what? (format: LOOK IN <container>)'};
  let dotNotation = splitArgs[1].split('.');

  let container = termsProcessor(props.inventory, dotNotation);

  // If the player is looking in a container they're carrying, handle the logic client-side.
  if (container) {
    if (!container.container) return {funcsToCall: [newMessage], feedback: 'That isn\'t a container.'};
    return {
      funcsToCall: [newMessage],
      containedItems: container.container.contains
    };
  }

  // If the player is looking in a container in the room, pass it off to the server to handle.
  return {
    emitType: 'lookInContainer',
    container: splitArgs[1]
  };
}
