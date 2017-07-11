'use strict';

import {newMessage} from '../actions/message-actions.js';
import {createNew, setFirstPassword, incrementCreationStep, setUsername, setCreationStep} from '../actions/login-actions.js';

export default function loginHandler(command, args, props) {
  if (props.creatingNew) {
    if (command === 'new') return {funcsToCall: [newMessage], feedback: 'You\'re already in the process of making a character.'};
    if (props.creationStep === 0) return {emitType: 'checkUsername', newUsername: command};
    if (props.creationStep === 1) return {funcsToCall: [newMessage, incrementCreationStep, setFirstPassword], firstPassword: command, feedback: 'Confirm password.'};
    if (props.creationStep === 2) {
      if (command !== props.firstPassword) return {funcsToCall: [newMessage, setCreationStep], step: 1, feedback: 'Passwords don\'t match. Please enter a new password.'};
      return {emitType: 'createCharacter', newUsername: props.newUsername, password: command};
    }
  }

  if (command === 'new' && props.creationStep === 0) {
    return {
      funcsToCall: [newMessage, createNew],
      feedback: 'Please enter a name for your character.'
    };
  }

  if (props.creationStep === 0) return {funcsToCall: [newMessage, incrementCreationStep, setUsername], newUsername: command, feedback: 'Enter the password for that character.'};
  if (props.creationStep === 1) {
    return {
      emitType: 'login',
      username: props.newUsername,
      password: command
    };
  }
}
