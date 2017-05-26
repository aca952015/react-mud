'use strict';

import {newMessage} from '../actions/message-actions.js';
import {sayProcessor} from '../processors/say-processor.js';
import {whisperProcessor} from '../processors/whisper-processor.js';
import {moveProcessor} from '../processors/move-processor.js';

export default function socketHandlers(socket, props) {
  socket.username = props.username;
  socket.currentRoom = 'Nexus';
  socket.emit('changeName', socket.username);
  socket.on('message', result => props.dispatch(newMessage(sayProcessor(result, socket))));
  socket.on('occupants', result => props.dispatch(newMessage(result)));
  socket.on('whisperSuccess', result => props.dispatch(newMessage(whisperProcessor(result, socket))));
  socket.on('whisperFail', () => props.dispatch(newMessage({text: 'I don\'t see that person here.'})));
  socket.on('movementLeave', movement => props.dispatch(newMessage({text: `${movement.username} moves ${movement.direction}.`})));
  socket.on('movementArrive', movement => props.dispatch(newMessage(moveProcessor(movement))));
}
