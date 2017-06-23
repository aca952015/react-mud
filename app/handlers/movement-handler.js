'use strict';

import {newMessage} from '../actions/message-actions.js';
import {roomData} from '../data/rooms.js';

export default function movementHandler(command, args, socket, props) {
  if (props.combat.active) return {funcsToCall: [newMessage], feedback: `You're busy fighting ${props.combat.target.short}!`};
  if (roomData[socket.currentRoom].exits[command]) {
    return {
      direction: command,
      emitType: 'move'
    };
  }
  return {
    feedback: 'I don\'t see that exit here.',
    funcsToCall: [newMessage]
  };
}
