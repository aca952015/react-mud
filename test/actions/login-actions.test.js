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
});
