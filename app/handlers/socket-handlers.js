'use strict';

import {newMessage} from '../actions/message-actions.js';
import {getItem, dropItem, getAll, dropAll} from '../actions/inventory-actions.js';
import {enterCombat, damageUser, slayEnemy} from '../actions/combat-actions.js';
import {changeRoom} from '../actions/move-actions.js';
import {saveID, loginUser, loginEquipment} from '../actions/user-actions.js';
import {setUsername, incrementCreationStep} from '../actions/login-actions.js';
import whisperProcessor from '../processors/whisper-processor.js';
import moveProcessor from '../processors/move-processor.js';
import combatProcessor from '../processors/combat-processor.js';

export default function socketHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;
  // On initially connecting, send the user to the Login Room, then give them some
  // default user data and equipment to prevent errors.
  socket.on('initialConnect', char => {
    socket.emit('teleport', 'Login Room');
    props.dispatch(loginUser(char));
    props.dispatch(loginEquipment(char.equipment));
  });

  // Once the server has sent a loginSuccessful event, update the username, equipment,
  // description, and various saved data on the client and the server. If it's a new
  // character, they will have been in the Login Room, so teleport them to the Nexus.
  // Otherwise, teleport them to whatever room they were in when they logged off.
  socket.on('loginSuccessful', char => {
    socket.emit('changeName', char.loginUser.username);
    socket.emit('changeDescription', {playerDescription: char.loginUser.description});
    socket.emit('updateEquipment', char.loginEquipment);
    props.dispatch(loginUser(char.loginUser));
    props.dispatch(loginEquipment(char.loginEquipment));
    if (homeCtx.props.currentRoom === 'Login Room') {
      props.dispatch(changeRoom('Nexus'));
      socket.emit('teleport', 'Nexus');
      return socket.emit('move', {direction: 'login'});
    }
    props.dispatch(changeRoom(homeCtx.props.currentRoom));
    socket.emit('teleport', homeCtx.props.currentRoom);
    socket.emit('move', {direction: 'login'});
  });

  // nameAvailable is used for creating new characters. This event only gets emitted
  // if a new name is not already in use.
  socket.on('nameAvailable', name => {
    props.dispatch(setUsername(`${name[0].toUpperCase()}${name.slice(1)}`));
    props.dispatch(incrementCreationStep());
    props.dispatch(newMessage({feedback: 'Please enter a password for your character.'}));
  });

  // Get the _id property back from a Mongoose Schema to reference for saving later.
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
