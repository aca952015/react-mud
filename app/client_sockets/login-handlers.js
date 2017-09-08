'use strict';

import {setUsername, incrementCreationStep, endCreation, setCreationStep, loginEffects, loginUser, loginEquipment} from '../actions/login-actions.js';
import {escapeCombat} from '../actions/combat-actions.js';
import {newMessage} from '../actions/message-actions.js';
import {changeRoom} from '../actions/move-actions.js';

export default function loginHandlers(homeCtx) {
  const socket = homeCtx.socket;
  const props = homeCtx.props;
  // On initially connecting, send the user to the Login Room, then give them some
  // default user data and equipment to prevent errors.
  socket.on('initialConnect', char => {
    socket.emit('teleport', 'Login Room');
    props.dispatch(changeRoom('Login Room'));
    props.dispatch(loginUser({loginUser: char.user}));
    props.dispatch(loginEquipment({loginEquipment: char.equipment}));
  });

  // Once the server has sent a loginSuccessful event, update the username, equipment,
  // description, and various saved data on the client and the server. If it's a new
  // character, they will have been in the Login Room, so teleport them to the Academy Entrance.
  // Otherwise, teleport them to whatever room they were in when they logged off.
  socket.on('loginSuccessful', char => {
    socket.emit('changeName', char.loginUser.username);
    socket.emit('changeDescription', {playerDescription: char.loginUser.description});
    socket.emit('updateEquipment', char.loginEquipment);
    socket.emit('updateEffects', char.effects);
    props.dispatch(endCreation());
    props.dispatch(setCreationStep({step: 0}));
    props.dispatch(loginUser({loginUser: char.loginUser}));
    props.dispatch(loginEquipment({loginEquipment: char.loginEquipment}));
    props.dispatch(loginEffects({loginEffects: char.effects}));
    props.dispatch(escapeCombat());
    if (homeCtx.props.currentRoom === 'Login Room') {
      props.dispatch(changeRoom('Academy - Academy Entrance'));
      socket.emit('teleport', 'Academy - Academy Entrance');
      return socket.emit('move', {direction: 'login'});
    }
    props.dispatch(changeRoom(homeCtx.props.currentRoom));
    socket.emit('teleport', homeCtx.props.currentRoom);
    socket.emit('move', {direction: 'login'});
  });

  // If the login fails, go back to step 0 for creation and inform the player that the
  // password was invalid.
  socket.on('loginFail', () => {
    props.dispatch(setCreationStep({step: 0}));
    props.dispatch(newMessage({feedback: 'Invalid password or that character doesn\'t exist. Enter "new" or a character name to login.'}));
  });

  // If someone is already logged in with a character's name, return to step 0 and inform
  // the user of such.
  socket.on('alreadyConnected', () => {
    props.dispatch(setCreationStep({step: 0}));
    props.dispatch(newMessage({feedback: 'That user is already logged in. Enter "new" or a character name to login.'}));
  });

  // nameAvailable is used for creating new characters. This event only gets emitted
  // if a new name is not already in use.
  socket.on('nameAvailable', name => {
    props.dispatch(setUsername({newUsername: `${name[0].toUpperCase()}${name.slice(1)}`}));
    props.dispatch(incrementCreationStep());
    props.dispatch(newMessage({feedback: 'Please enter a password for your character.'}));
  });

}
