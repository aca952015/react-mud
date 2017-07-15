'use strict';

import {startCooldown, endCooldown} from '../../app/actions/skill-actions.js';

describe('skill actions', () => {
  describe('startCooldown', () => {
    it('should return an object with type "ON_COOLDOWN" and payload of the name passed in', () => {
      expect(startCooldown('slash')).toEqual({type: 'ON_COOLDOWN', payload: 'slash'});
    });
  });
});
