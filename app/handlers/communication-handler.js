'use strict';

export default function communicationHandler(command, props, args) {
  if (command === 'say') {
    return {
      from: props.username,
      text: args,
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
      emitType: 'whisper'
    };
  }
}
