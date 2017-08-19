'use strict';

import {helpFile} from '../data/help-files.js';
import {newMessage} from '../actions/message-actions.js';

export default function helpHandler(command, args) {
  let helpObj, feedback = '';
  if (!args) helpObj = helpFile['help'];
  if (args) {
    const regEx = new RegExp(`^${args}`, 'i');
    const helpTopics = Object.keys(helpFile);
    const targetedTopic = helpTopics.find(topic => topic.match(regEx));
    helpObj = helpFile[targetedTopic];
  }

  if (!helpObj) feedback = 'I don\'t have a help file for that.';

  return {
    funcsToCall: [newMessage],
    helpObj,
    feedback
  };
}
