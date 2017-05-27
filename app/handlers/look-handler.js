'use strict';

import {roomData} from '../data/rooms.js';
import {newMessage} from '../actions/message-actions.js';

export default function lookHandler(socket) {
  return {
    roomName: socket.currentRoom,
    emitType: 'look',
    desc: roomData[socket.currentRoom].desc,
    exits: roomData[socket.currentRoom].exits,
    funcToCall: newMessage
  };
}
