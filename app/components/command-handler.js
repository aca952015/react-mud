'use strict';

import {newMessage} from '../actions/message-actions.js';

export const commandHandler = (command, args, props) => {
  if (command === 'say') {
    return {
      from: `${props.username} says, `,
      text: `"${args}"`,
      funcToCall: newMessage,
      emitType: 'message'
    };
  }
  if (command === 'whisper') {
    const line = args.split(' ');
    const target = line[0];
    const text = line.slice(1).join(' ');
    return {
      target,
      text,
      from: props.username,
      funcToCall: '',
      emitType: 'whisper'
    };
  }
};
