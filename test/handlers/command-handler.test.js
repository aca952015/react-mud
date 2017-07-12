'use strict';

import commandHandler from '../../app/handlers/command-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {createNew} from '../../app/actions/login-actions.js';

describe('CommandHandler', () => {
  it('should return an object with the feedback "I\'m not sure what you\'re trying to do" with a bad command', () => {
    expect(commandHandler('Yo', null, {inventory: []})).toEqual({funcsToCall: [newMessage], feedback: 'I\'m not sure what you\'re trying to do.'});
  });

  it('should properly understand args shorthand', () => {
    expect(commandHandler('unlock', 'e', {inventory: []})).toEqual({
      emitType: 'lock',
      inventory: [],
      direction: 'east'
    });
  });

  it('should properly understand command shorthand', () => {
    expect(commandHandler('inv', 'what up', {inventory: []})).toEqual({funcsToCall: [newMessage], inventory: []});
  });

  describe('With a location of Login Room', () => {
    it('should return a loginHandler object', () => {
      expect(commandHandler('new', undefined, {currentRoom: 'Login Room', creatingNew: false, creationStep: 0})).toEqual({
        funcsToCall: [newMessage, createNew],
        feedback: 'Please enter a name for your character.'
      });
    });
  });
});
