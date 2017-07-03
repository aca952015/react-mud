'use strict';

import {newMessage} from '../actions/message-actions.js';
import {dropItem} from '../actions/inventory-actions.js';
import termsProcessor from '../processors/terms-processor.js';

export default function giveHandler(command, args, props) {
  args = args.toLowerCase();
  let splitArgs = args.split(' ');
  if (!args || splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'Give what to whom? (format: GIVE <item> <target>)'};
  if (splitArgs[1].toLowerCase() === props.username.toLowerCase()) return {funcsToCall: [newMessage], feedback: 'You can\'t give items to yourself.'};
  let dotNotation = splitArgs[0].split('.');

  let item = termsProcessor(props.inventory, dotNotation);
  if (!item) return {funcsToCall: [newMessage], feedback: 'You don\'t seem to be carrying that.'};

  return {
    funcsToCall: [dropItem],
    emitType: 'give',
    item,
    target: splitArgs[1]
  };
}
