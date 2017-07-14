'use strict';

import {helpFile} from '../data/help-files.js';
import {newMessage} from '../actions/message-actions.js';

export default function helpHandler(command, args) {
  let helpObj, feedback = '';
  if (!args) helpObj = helpFile['help'];
  if (args) {
    let regEx = new RegExp(`^${args}`, 'i');
    let helpTopics = Object.keys(helpFile);
    let targetedTopic = helpTopics.find(topic => topic.match(regEx));
    helpObj = helpFile[targetedTopic];
  }

  if (!helpObj) feedback = 'I don\'t have a help file for that.';

  return {
    funcsToCall: [newMessage],
    helpObj,
    feedback
  };
}
