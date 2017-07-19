'use strict';

import {enterCombat, damageUser, slayEnemy, escapeCombat, addEffect, removeEffect, fullRestore} from '../../app/actions/combat-actions.js';

describe('combat actions', () => {
  describe('enterCombat', () => {
    it('should return a type of ENTER_COMBAT and a payload of what got passed in', () => {
      expect(enterCombat('ayy')).toEqual({type: 'ENTER_COMBAT', payload: 'ayy'});
    });
  });

  describe('damageUser', () => {
    it('should return a type of DAMAGE_USER and a payload of what got passed in', () => {
      expect(damageUser({damage: 2})).toEqual({type: 'DAMAGE_USER', payload: 2});
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

  describe('addEffect', () => {
    it('should return an object with type "ADD_EFFECT" and payload of the effect', () => {
      expect(addEffect('test')).toEqual({type: 'ADD_EFFECT', payload :'test'});
    });
  });

  describe('removeEffect', () => {
    it('should return an object with type "REMOVE_EFFECT" and payload of the effect', () => {
      expect(removeEffect('test')).toEqual({type: 'REMOVE_EFFECT', payload: 'test'});
    });
  });

  describe('fullRestore', () => {
    it('should return an object with type "FULL_RESTORE"', () => {
      expect(fullRestore()).toEqual({type: 'FULL_RESTORE'});
    });
  });
});
