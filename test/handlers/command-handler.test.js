'use strict';

import commandHandler from '../../app/handlers/command-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {createNew} from '../../app/actions/login-actions.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';

describe('CommandHandler', () => {
  it('should return an object with the feedback "I\'m not sure what you\'re trying to do" with a bad command', () => {
    expect(commandHandler('Yo', null, {effects: {death: false}, skills: {}, inventory: []})).toEqual({funcsToCall: [newMessage], feedback: 'I\'m not sure what you\'re trying to do.'});
  });

  it('should properly understand args shorthand', () => {
    expect(commandHandler('unlock', 'e', {effects: {death: false}, inventory: []})).toEqual({
      emitType: 'lock',
      inventory: [],
      direction: 'east'
    });
  });

  it('should properly understand command shorthand', () => {
    expect(commandHandler('inv', 'what up', {effects: {death: false}, inventory: []})).toEqual({funcsToCall: [newMessage], inventory: []});
  });

  describe('With a location of Login Room', () => {
    it('should return a loginHandler object', () => {
      expect(commandHandler('new', undefined, {effects: {death: false} ,currentRoom: 'Login Room', creatingNew: false, creationStep: 0})).toEqual({
        funcsToCall: [newMessage, createNew],
        feedback: 'Please enter a name for your character.'
      });
    });
  });

  describe('If dead', () => {
    describe('Entering an acceptable command', () => {
      it('should return the object for that command', () => {
        expect(commandHandler('resurrect', undefined, {effects: {death: true}})).toEqual({emitType: 'resurrect'});
      });
    });

    describe('Entering an unacceptable command', () => {
      it('should tell the user they are dead', () => {
        expect(commandHandler('get', 'potion', {effects: {death: true}})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You can\'t do that while dead. You\'ll have to get resurrected first.'
        });
      });
    });
  });

  describe('With a skill', () => {
    describe('If the globalCooldown is still active', () => {
      it('should tell the user "You\'ll have to wait for the global cooldown to finish."', () => {
        expect(commandHandler('slash', 'bat', {skills: warriorSkills, globalCooldown: true, effects: {death: false}})).toEqual({
          funcsToCall: [newMessage],
          feedback: 'You\'ll have to wait for the global cooldown to finish.'
        });
      });
    });
  });
});
