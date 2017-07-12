'use strict';

import bcrypt from 'bcryptjs';
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

    describe('On creationStep 1', () => {
      it('should take whatever was entered as a password and pass it off to the server for authentication', () => {
        expect(loginHandler('somePassword', undefined, {...props, creationStep: 1, newUsername: 'someName'})).toEqual({
          emitType: 'login',
          username: 'someName',
          password: 'somePassword'
        });
      });
    });

    describe('On an unknown error', () => {
      it('should return an unknown error object', () => {
        expect(loginHandler('duder', undefined, {...props, creationStep: 3, newUsername: 'Dunno'})).toEqual({
          funcsToCall: [newMessage, setCreationStep],
          step: 0,
          feedback: 'Encountered an unknown error. Starting over. Enter "new" or an existing character name.'
        });
      });
    });
  });

  describe('In the process of making a new character', () => {
    describe('On creationStep 0', () => {
      it('should check if the name entered is taken', () => {
        expect(loginHandler('duder', undefined, {...props, creatingNew: true})).toEqual({
          emitType: 'checkUsername',
          newUsername: 'duder'
        });
      });
    });

    describe('On creationStep 1', () => {
      it('should set the first password, then ask for the password again to confirm it', () => {
        expect(loginHandler('banana', undefined, {...props, creatingNew: true, creationStep: 1})).toEqual({
          funcsToCall: [newMessage, incrementCreationStep, setFirstPassword],
          firstPassword: 'banana',
          feedback: 'Confirm password.'
        });
      });
    });

    describe('On creationStep 2', () => {
      describe('With a password that matches the one from step one', () => {
        it('should emit a createCharacter object', () => {
          expect(loginHandler('banana', undefined, {
            ...props,
            creatingNew: true,
            creationStep: 2,
            firstPassword: bcrypt.hashSync('banana', 10)
          }))
          .toEqual({
            emitType: 'createCharacter',
            newUsername: props.newUsername,
            password: 'banana'
          });
        });
      });

      describe('With a password that doesn\'t match the one from step one', () => {
        it('should return the user to step 1 and inform them they entered a different password', () => {
          expect(loginHandler('BANA', undefined, {
            ...props,
            creatingNew: true,
            creationStep: 2,
            firstPassword: bcrypt.hashSync('banana', 10)
          }))
          .toEqual({
            funcsToCall: [newMessage, setCreationStep],
            step: 1,
            feedback: 'Passwords don\'t match. Please enter a new password.'
          });
        });
      });
    });

    describe('With some unknown error', () => {
      it('should return an unknown error object', () => {
        expect(loginHandler('banana', undefined, {...props, creatingNew: true, creationStep: 3, firstPassword: 'banana'})).toEqual({
          funcsToCall: [newMessage, setCreationStep],
          step: 0,
          feedback: 'Encountered an unknown error. Starting over. Enter "new" or an existing character name.'
        });
      });
    });
  });
});
