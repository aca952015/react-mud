'use strict';

import {enterCombat, damageUser, slayEnemy} from '../../app/actions/combat-actions.js';

describe('combat actions', () => {
  describe('enterCombat', () => {
    it('should return a type of ENTER_COMBAT and a payload of what got passed in', () => {
      expect(enterCombat('ayy')).toEqual({type: 'ENTER_COMBAT', payload: 'ayy'});
    });
  });
});
