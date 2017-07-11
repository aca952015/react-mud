'use strict';

import bcrypt from 'bcrypt';
import {newMessage} from '../actions/message-actions.js';
import {createNew, setFirstPassword, incrementCreationStep, setUsername, setCreationStep} from '../actions/login-actions.js';

export default function loginHandler(command, args, props) {
  // props.creatingNew checks if the user is currently in the process of making a new character.
  if (props.creatingNew) {
    if (command === 'new') return {funcsToCall: [newMessage], feedback: 'You\'re already in the process of making a character.'};

    // Step 0: The user has been asked to enter a name for their character.
    //         Upon entering it, the server will check if the username exists.
    //         If it doesn't, they get the feedback to enter a password from a
    //         socket listener.
    // Step 1: Entering the password the first time. It sets it as firstPassword,
    //         then preps the user for step 2, which is confirming the password.
    // Step 2: Compares the password from step 1. If a match, have the server make
    //         a new character. If not, take them back to step 1.
    if (props.creationStep === 0) return {emitType: 'checkUsername', newUsername: command};
    if (props.creationStep === 1) return {funcsToCall: [newMessage, incrementCreationStep, setFirstPassword], firstPassword: command, feedback: 'Confirm password.'};
    if (props.creationStep === 2) {
      if (!bcrypt.compareSync(command, props.firstPassword)) return {funcsToCall: [newMessage, setCreationStep], step: 1, feedback: 'Passwords don\'t match. Please enter a new password.'};
      return {emitType: 'createCharacter', newUsername: props.newUsername, password: command};
    }

    // This should never happen, but if for some reason they escape the creationStep process, take them back to step 0.
    return {funcsToCall: [newMessage, setCreationStep], step: 0, feedback: 'Encountered an unknown error. Starting over. Enter "new" or an existing character name.'};
  }

  // If the user has not already started making a new character, enters the word "new",
  // but is not on the step of entering a password, then prompt the user to get ready for
  // step 0 in the creatingNew section.
  if (command === 'new' && props.creationStep === 0) {
    return {
      funcsToCall: [newMessage, createNew],
      feedback: 'Please enter a name for your character.'
    };
  }

  // If this section is reached, it means the user has entered a character's name of some sort for step 0.
  // Step 1: Send the entered username and the entered password to the server for validation. If it fails,
  // a socket listener sets creationStep back to 0.
  if (props.creationStep === 0) return {funcsToCall: [newMessage, incrementCreationStep, setUsername], newUsername: command, feedback: 'Enter the password for that character.'};
  if (props.creationStep === 1) {
    return {
      emitType: 'login',
      username: props.newUsername,
      password: command
    };
  }

  // This should never happen, but if for some reason they escape the creation process, take them back to step 0.
  return {funcsToCall: [newMessage, setCreationStep], step: 0, feedback: 'Encountered an unknown error. Starting over. Enter "new" or an existing character name.'};
}
