'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function communicationHandler(command, args, socket, props) {
  if (command === 'say') {
    if (!args) return {funcsToCall: [newMessage], text: 'Say what?'};
    return {
      from: props.username,
      text: args,
      emitType: 'say'
    };
  }
  if (command === 'whisper') {
    if (args.split(' ').length === 1) return {funcsToCall: [newMessage], text: 'Whisper what to whom? (format: whisper <target> <message>)'};
    const line = args.split(' ');
    const target = line[0];
    const text = line.slice(1).join(' ').trim();
    return {
      target,
      text,
      from: props.username,
      emitType: 'whisper'
    };
  }
}
