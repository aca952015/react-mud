'use strict';

import commandHandler from '../../app/handlers/command-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {createNew} from '../../app/actions/login-actions.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import skillHandler from '../../app/handlers/skill-handler.js';
import newMob from '../../app/data/mobs.js';

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

    describe('If there is not a cooldown active', () => {
      it('should return the result of skillHandler with that skill passed in', () => {
        let props = {
          skills: warriorSkills,
          effects: {death: false},
          globalCooldown: false,
          equipment,
          atk: 2,
          combat: {
            active: true,
            targets: [newMob('bat')]
          },
          username: 'Dave'
        };
        expect(commandHandler('slash', 'bat', props)).toEqual(skillHandler(warriorSkills['slash'], 'bat', props));
      });
    });
  });
});
