'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getItem} from '../actions/inventory-actions.js';
import {enterCombat, damageUser, endCombat} from '../actions/combat-actions.js';
import whisperProcessor from '../processors/whisper-processor.js';
import moveProcessor from '../processors/move-processor.js';
import itemPickUpProcessor from '../processors/item-pickup-processor.js';
import combatProcessor from '../processors/combat-processor.js';

export default function socketHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;
  socket.username = props.username;
  socket.currentRoom = 'Nexus';
  socket.description = props.character.description;
  socket.emit('changeName', socket.username);
  socket.emit('changeDescription', socket.description);
  socket.emit('look', {target: null});
  socket.emit('move', {direction: 'login'});
  socket.on('move', result => socket.currentRoom = result);
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
  socket.on('enterCombat', target => {
    props.dispatch(newMessage({feedback: `You move to attack ${target.short}.`}));
    props.dispatch(enterCombat(target));
  });
  socket.on('damage', dmgObj => {
    props.dispatch(damageUser(dmgObj.damage));
    props.dispatch(newMessage({feedback: `${dmgObj.enemy.short} damages you for ${dmgObj.damage}.`}));
  });
  socket.on('endCombat', () => props.dispatch(endCombat()));
  socket.on('combatTick', () => {
    // For some reason, props does not actually update accordingly with the state of the Home
    // component. The current state can only be correctly referred to by using homeCtx.props instead of
    // assigning homeCtx.props to a variable and using that.
    if (homeCtx.props.combat.active) combatProcessor(socket, homeCtx.props);
  });
}
