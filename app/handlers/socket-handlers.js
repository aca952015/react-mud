'use strict';

import {newMessage} from '../actions/message-actions.js';
import sayProcessor from '../processors/say-processor.js';
import whisperProcessor from '../processors/whisper-processor.js';
import moveProcessor from '../processors/move-processor.js';
import itemPickUpProcessor from '../processors/item-pickup-processor.js';
import {updateRooms} from '../actions/room-actions.js';

export default function socketHandlers(socket, props) {
  socket.username = props.username;
  socket.currentRoom = 'Nexus';
  socket.emit('changeName', socket.username);
  socket.emit('look');
  socket.emit('move', {direction: 'login'});
  socket.on('message', result => props.dispatch(newMessage(sayProcessor(result, socket))));
  socket.on('generalMessage', result => props.dispatch(newMessage(result)));
  socket.on('whisperSuccess', result => props.dispatch(newMessage(whisperProcessor(result, socket))));
  socket.on('whisperFail', () => props.dispatch(newMessage({text: 'I don\'t see that person here.'})));
  socket.on('movementLeave', movement => movement.username ? props.dispatch(newMessage({text: `${movement.username} moves ${movement.direction}.`})) : null);
  socket.on('movementArrive', movement => props.dispatch(newMessage(moveProcessor(movement))));
  socket.on('pickUpItem', room => props.dispatch(newMessage(itemPickUpProcessor(room, socket))));
  socket.on('updateRooms', rooms => props.dispatch(updateRooms(rooms)));
}
