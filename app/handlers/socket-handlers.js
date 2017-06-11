'use strict';

import {newMessage} from '../actions/message-actions.js';
import whisperProcessor from '../processors/whisper-processor.js';
import moveProcessor from '../processors/move-processor.js';
import itemPickUpProcessor from '../processors/item-pickup-processor.js';
import {getItem} from '../actions/inventory-actions.js';

export default function socketHandlers(socket, props) {
  socket.username = props.username;
  socket.currentRoom = 'Nexus';
  socket.description = props.character.description;
  socket.emit('changeName', socket.username);
  socket.emit('changeDescription', socket.description);
  socket.emit('look', {target: null});
  socket.emit('move', {direction: 'login'});
  socket.on('move', result => socket.currentRoom = result);
  socket.on('say', result => props.dispatch(newMessage(result)));
  socket.on('generalMessage', result => props.dispatch(newMessage(result)));
  socket.on('whisperSuccess', result => props.dispatch(newMessage(whisperProcessor(result, socket))));
  socket.on('whisperFail', () => props.dispatch(newMessage({feedback: 'I don\'t see that person here.'})));
  socket.on('movementLeave', movement => {
    movement.username ? props.dispatch(newMessage({
      from: movement.username,
      feedback: ` moves ${movement.direction}.`})) : null;
  });
  socket.on('movementArrive', movement => props.dispatch(newMessage(moveProcessor(movement))));
  socket.on('pickUpItem', room => props.dispatch(newMessage(itemPickUpProcessor(room, socket))));
  socket.on('itemPickedUp', itemAndRoom => {
    props.dispatch(newMessage({feedback: `You pick up ${itemAndRoom.item.short}.`}));
    props.dispatch(getItem(itemAndRoom.item));
  });
}
