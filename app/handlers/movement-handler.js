'use strict';

import {roomData} from '../data/rooms.js';
import {newMessage} from '../actions/message-actions.js';

export default function movementHandler(command, socket) {
  if (roomData[socket.currentRoom].exits[command]) {
    let newRoom = roomData[roomData[socket.currentRoom].exits[command]];
    socket.currentRoom = newRoom.roomName;
    return {
      direction: command,
      roomName: newRoom.roomName,
      desc: newRoom.desc,
      exits: newRoom.exits,
      items: newRoom.items,
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
