'use strict';

import {roomData} from '../data/rooms.js';
import {newMessage} from '../actions/message-actions.js';

export const commandHandler = (command, args, props, socket) => {
  if (command === 'say') {
    return {
      from: props.username,
      text: args,
      funcToCall: '',
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
  if (command === 'e') command = 'east';
  if (command === 'w') command = 'west';
  if (command === 'n') command = 'north';
  if (command === 's') command = 'south';
  if (command === 'd') command = 'down';
  if (command === 'u') command = 'up';
  if (command === 'east' || command === 'north' || command === 'south' || command === 'west' || command === 'up' || command === 'down') {
    if (roomData[socket.currentRoom].exits[command]) {
      let newRoom = roomData[roomData[socket.currentRoom].exits[command]];
      socket.currentRoom = newRoom.roomName;
      return {
        direction: command,
        roomName: newRoom.roomName,
        desc: newRoom.desc,
        exits: newRoom.exits,
        funcToCall: newMessage,
        emitType: 'move'
      };
    }
    return {
      text: 'I don\'t see that exit here.'
    };
  }
};
