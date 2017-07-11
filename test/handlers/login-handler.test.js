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

    describe('While being asked to enter a password for a character that already exists', () => {
      it('should return an emitter object with the username and password', () => {
        expect(loginHandler('new', undefined, {...props, creationStep: 1})).toEqual({
          emitType: 'login',
          username: props.newUsername,
          password: 'new'
        });
      });
    });
  });

  describe('If not in the process of making a character and not entering "new"', () => {
    describe('On creationStep 0', () => {
      it('should assume you entered a name and ask for a password', () => {
        expect(loginHandler('someName', undefined, props)).toEqual({
          funcsToCall: [newMessage, incrementCreationStep, setUsername],
          newUsername: 'someName',
          feedback: 'Enter the password for that character.'
        });
      });
    });
  });
});
