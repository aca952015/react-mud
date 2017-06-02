'use strict';

import {newMessage} from '../actions/message-actions.js';
import {roomData} from '../data/rooms.js';

export default function movementHandler(command, args, socket) {
  if (roomData[socket.currentRoom].exits[command]) {
    let newRoom = roomData[roomData[socket.currentRoom].exits[command]];
    socket.currentRoom = newRoom.roomName;
    return {
      direction: command,
      funcsToCall: [newMessage],
      text: `You move ${command}.`,
      emitType: 'move'
    };
  }
  return {
    text: 'I don\'t see that exit here.',
    funcsToCall: [newMessage]
  };
}
