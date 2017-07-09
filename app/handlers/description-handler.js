'use strict';

import {newMessage} from '../actions/message-actions.js';
import {truncateDescription, addDescriptionParagraph, clearDescription} from '../actions/user-actions.js';

export default function descriptionHandler(command, args, props) {
  if (!args) return {funcsToCall: [newMessage], playerDescription: props.description};
  const splitArgs = args.split(' ');
  if (splitArgs[0] === '-') {
    let playerDescription = props.description.slice(0, props.description.length - 1);
    if (playerDescription.length < 1) playerDescription = ['No description set.'];
    return {
      funcsToCall: [newMessage, truncateDescription],
      playerDescription,
      emitType: 'changeDescription'
    };
  }
  if (splitArgs[0] === '+') {
    if (splitArgs.length < 2) return {funcsToCall: [newMessage], feedback: 'What did you want to add to your description? (format: DESC + {paragraph})'};
    let playerDescription = props.description[0] === 'No description set.' ? [splitArgs.slice(1).join(' ')] : [...props.description, splitArgs.slice(1).join(' ')];
    return {
      funcsToCall: [newMessage, addDescriptionParagraph],
      playerDescription,
      emitType: 'changeDescription'
    };
  }
  if (splitArgs[0].toLowerCase() === 'clear') {
    return {
      funcsToCall: [newMessage, clearDescription],
      playerDescription: ['No description set.'],
      emitType: 'changeDescription'
    };
  }

  return {funcsToCall: [newMessage], feedback: 'I\'m not sure what you\'re trying to do to your description. Try HELP DESCRIPTION for formatting.'};
}
