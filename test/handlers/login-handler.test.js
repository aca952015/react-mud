'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {createNew, setFirstPassword, incrementCreationStep, setUsername, setCreationStep} from '../../app/actions/login-actions.js';
import loginHandler from '../../app/handlers/login-handler.js';

describe('loginHandler', () => {
  let props = {
    creatingNew: false,
    creationStep: 0,
    firstPassword: 'default',
    newUsername: 'default'
  };

  describe('With a command of new', () => {
    describe('Without having already entered the new character creation process', () => {
      it('should return a createNew object with feedback asking to enter a name', () => {
        expect(loginHandler('new', undefined, props)).toEqual({
          funcsToCall: [newMessage, createNew],
          feedback: 'Please enter a name for your character.'
        });
      });
    });

    describe('While already in the process of making a new character', () => {
      it('should return a feedback error of already making a character', () => {
        expect(loginHandler('new', undefined, {...props, creatingNew: true})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You\'re already in the process of making a character.'
        });
      });
    });
  });
});
