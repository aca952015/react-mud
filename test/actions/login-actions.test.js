'use strict';

import {incrementCreationStep, createNew, endCreation, setUsername, setFirstPassword, setCreationStep} from '../../app/actions/login-actions.js';

describe('Login actions', () => {
  describe('incrementCreationStep', () => {
    it('should return an object with type "INCREMENT_CREATION_STEP"', () => {
      expect(incrementCreationStep()).toEqual({type: 'INCREMENT_CREATION_STEP'});
    });
  });

  describe('createNew', () => {
    it('should return an object with type "NEW_CHARACTER"', () => {
      expect(createNew()).toEqual({type: 'NEW_CHARACTER'});
    });
  });

  describe('endCreation', () => {
    it('should return an object with type "CHARACTER_COMPLETE"', () => {
      expect(endCreation()).toEqual({type: 'CHARACTER_COMPLETE'});
    });
  });

  describe('setUsername', () => {
    it('should return an object with type "SET_USERNAME" and payload of the name passed in', () => {
      expect(setUsername({newUsername: 'dave'})).toEqual({type: 'SET_USERNAME', payload: 'dave'});
    });
  });

  describe('setFirstPassword', () => {
    it('should return an object with type "SET_FIRST_PASSWORD" and payload of the password passed in', () => {
      expect(setFirstPassword({firstPassword: 'dave'})).toEqual({type: 'SET_FIRST_PASSWORD', payload: 'dave'});
    });
  });

  describe('setCreationStep', () => {
    it('should return an object with type "SET_CREATION_STEP" and payload of the number passed in', () => {
      expect(setCreationStep({step: 4})).toEqual({type: 'SET_CREATION_STEP', payload: 4});
    });
  });
});
