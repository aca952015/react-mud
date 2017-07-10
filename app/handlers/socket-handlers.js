'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getItem, dropItem, getAll, dropAll} from '../actions/inventory-actions.js';
import {enterCombat, damageUser, slayEnemy} from '../actions/combat-actions.js';
import {changeRoom} from '../actions/move-actions.js';
import {saveID, loginUser, loginEquipment} from '../actions/user-actions.js';
import whisperProcessor from '../processors/whisper-processor.js';
import moveProcessor from '../processors/move-processor.js';
import combatProcessor from '../processors/combat-processor.js';

export default function socketHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;
  // On login, let the server know what the user's name, desc, and equipment is,
  // then get the room description and announce to others in the room that the
  // user has logged in.
  socket.on('loginSuccessful', char => {
    socket.emit('changeName', char.username);
    socket.emit('changeDescription', {playerDescription: char.description});
    socket.emit('updateEquipment', char.equipment);
    socket.emit('look', {target: null});
    socket.emit('move', {direction: 'login'});
    props.dispatch(loginUser(char));
    props.dispatch(loginEquipment(char.equipment));
  });
  socket.on('characterID', id => props.dispatch(saveID(id)));
  socket.on('move', result => props.dispatch(changeRoom(result)));
  socket.on('generalMessage', result => props.dispatch(newMessage(result)));
  socket.on('whisperSuccess', result => props.dispatch(newMessage(whisperProcessor(result, homeCtx.props.username))));
  socket.on('whisperFail', () => props.dispatch(newMessage({feedback: 'I don\'t see that person here.'})));
  socket.on('movementLeave', movement => {
    // Sometimes the server has a socket with no username. This conditional corrects for that error.
    // A better solution would be to ensure the server isn't managing any sockets without usernames,
    // but I haven't gotten to that yet.
    movement.username ? props.dispatch(newMessage({
      from: movement.username,
      feedback: ` moves ${movement.direction}.`})) : null;
  });
  socket.on('movementArrive', movement => props.dispatch(newMessage(moveProcessor(movement))));
  socket.on('forceDrop', item => props.dispatch(dropItem({item})));
  socket.on('forceGet', item => props.dispatch(getItem(item)));
  socket.on('forceDropAll', () => props.dispatch(dropAll()));
  socket.on('getAll', itemArray => props.dispatch(getAll(itemArray)));
  socket.on('enterCombat', target => {
    if (homeCtx.props.combat.targets.find(mob => mob.id === target.id)) return props.dispatch(newMessage({feedback: `You're already fighting ${target.short}!`}));
    props.dispatch(newMessage({
      combatLog: {
        from: {
          friendly: 'You'
        },
        interaction: ' move to attack ',
        target: {
          enemy: target.short
        },
        punctuation: '.'
      }
    }));
    props.dispatch(enterCombat(target));
  });
  socket.on('damage', dmgObj => {
    props.dispatch(damageUser(dmgObj.damage));
    props.dispatch(newMessage({
      combatLog: {
        from: {
          enemy: `${dmgObj.enemy.short[0].toUpperCase()}${dmgObj.enemy.short.slice(1)}`,
        },
        pre: ' deals ',
        damage: dmgObj.damage,
        post: ' damage to ',
        target: {
          friendly: 'you'
        },
        punctuation: '.'
      }
    }));
  });
  socket.on('slayEnemy', enemy => props.dispatch(slayEnemy(enemy)));
  socket.on('combatTick', () => {
    // For some reason, props does not actually update accordingly with the state of the Home
    // component. The current state can only be correctly referred to by using homeCtx.props instead of
    // assigning homeCtx.props to a variable and using that.
    if (homeCtx.props.combat.active) combatProcessor(socket, homeCtx.props);
  });
}
