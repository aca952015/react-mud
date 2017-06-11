'use strict';

import {helpFile} from '../data/help-files.js';
import {newMessage} from '../actions/message-actions.js';

export default function helpHandler(command, args) {
  if (args) args = args.toLowerCase();
  let helpObj = helpFile[args];
  if (!args) helpObj = helpFile['help'];
  let feedback = '';
  if (!helpObj) feedback = 'I don\'t have a help file for that.';

  return {
    funcsToCall: [newMessage],
    helpObj,
    feedback
  };
}
