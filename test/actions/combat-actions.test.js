'use strict';

import {enterCombat, damageUser, slayEnemy, escapeCombat} from '../../app/actions/combat-actions.js';

describe('combat actions', () => {
  describe('enterCombat', () => {
    it('should return a type of ENTER_COMBAT and a payload of what got passed in', () => {
      expect(enterCombat('ayy')).toEqual({type: 'ENTER_COMBAT', payload: 'ayy'});
    });
  });

  describe('damageUser', () => {
    it('should return a type of DAMAGE_USER and a payload of what got passed in', () => {
      expect(damageUser(2)).toEqual({type: 'DAMAGE_USER', payload: 2});
    });
  });

  describe('slayEnemy', () => {
    it('should return a type of SLAY_ENEMY and a payload of what got passed in', () => {
      expect(slayEnemy('ayy')).toEqual({type: 'SLAY_ENEMY', payload: 'ayy'});
    });
  });

  describe('escapeCombat', () => {
    it('should return an object with a type of "ESCAPE_COMBAT"', () => {
      expect(escapeCombat()).toEqual({type: 'ESCAPE_COMBAT'});
    });
  });
});
