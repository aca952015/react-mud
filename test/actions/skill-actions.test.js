'use strict';

import {startCooldown, endCooldown} from '../../app/actions/skill-actions.js';

describe('skill actions', () => {
  describe('startCooldown', () => {
    it('should return an object with type "ON_COOLDOWN" and payload of the name passed in', () => {
      expect(startCooldown('slash')).toEqual({type: 'ON_COOLDOWN', payload: 'slash'});
    });
  });

  describe('endCooldown', () => {
    it('should return an object with type "OFF_COOLDOWN" and payload of the name passed in', () => {
      expect(endCooldown('slash')).toEqual({type: 'OFF_COOLDOWN', payload: 'slash'});
    });
  });
});
