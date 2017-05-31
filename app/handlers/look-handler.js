'use strict';

import {newMessage} from '../actions/message-actions.js';

export default function lookHandler(socket, rooms) {
  return {
    roomName: socket.currentRoom,
    emitType: 'look',
    desc: rooms[socket.currentRoom].desc,
    exits: rooms[socket.currentRoom].exits,
    funcsToCall: [newMessage]
  };
}
