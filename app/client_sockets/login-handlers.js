'use strict';

import {loginUser, loginEquipment} from '../actions/user-actions.js';
import {setUsername, incrementCreationStep, endCreation, setCreationStep, loginEffects} from '../actions/login-actions.js';
import {escapeCombat} from '../actions/combat-actions.js';
import {newMessage} from '../actions/message-actions.js';
import {changeRoom} from '../actions/move-actions.js';

export default function loginHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;
  // On initially connecting, send the user to the Login Room, then give them some
  // default user data and equipment to prevent errors.
  socket.on('initialConnect', char => {
    socket.emit('teleport', 'Login Room');
    props.dispatch(changeRoom('Login Room'));
    props.dispatch(loginUser(char.user));
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
    socket.emit('updateEffects', char.effects);
    props.dispatch(endCreation());
    props.dispatch(setCreationStep({step: 0}));
    props.dispatch(loginUser(char.loginUser));
    props.dispatch(loginEquipment(char.loginEquipment));
    props.dispatch(loginEffects(char.effects));
    props.dispatch(escapeCombat());
    if (homeCtx.props.currentRoom === 'Login Room') {
      props.dispatch(changeRoom('Nexus'));
      socket.emit('teleport', 'Nexus');
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

  // nameAvailable is used for creating new characters. This event only gets emitted
  // if a new name is not already in use.
  socket.on('nameAvailable', name => {
    props.dispatch(setUsername({newUsername: `${name[0].toUpperCase()}${name.slice(1)}`}));
    props.dispatch(incrementCreationStep());
    props.dispatch(newMessage({feedback: 'Please enter a password for your character.'}));
  });

}
