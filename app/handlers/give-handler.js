'use strict';

import {newMessage} from '../actions/message-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function giveHandler(command, args, props) {
  args = args.toLowerCase();
  const splitArgs = args.split(' ');
  if (!args || splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Give what to whom? (format: GIVE <item> <target>)'};
  if (splitArgs[1].toLowerCase() === props.username.toLowerCase()) return {funcsToCall: [newMessage], feedback: 'You can\'t give items to yourself.'};

  if (splitArgs[0] === 'all') {
    if (!props.inventory.length) return {funcsToCall: [newMessage], feedback: 'You aren\'t carrying anything to give.'};

    return {
      emitType: 'giveAll',
      itemArray: props.inventory,
      target: splitArgs[1]
    };
  }
  const dotNotation = splitArgs[0].split('.');

  const item = termsProcessor(props.inventory, dotNotation);
  if (!item) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};

  return {
    emitType: 'give',
    item,
    target: splitArgs[1]
  };
}
