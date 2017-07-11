'use strict';

import {incrementCreationStep, createNew, endCreation, setUsername, setFirstPassword, setCreationStep} from '../../app/actions/login-actions.js';

describe('Login actions', () => {
  describe('incrementCreationStep', () => {
    it('should return an object with type "INCREMENT_CREATION_STEP"', () => {
      expect(incrementCreationStep()).toEqual({type: 'INCREMENT_CREATION_STEP'});
    });
  });
});
