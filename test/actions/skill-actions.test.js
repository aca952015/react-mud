'use strict';

import {startCooldown, endCooldown, startGlobalCooldown, endGlobalCooldown, setSkills, decrementEffectDurations, refreshDuration} from '../../app/actions/skill-actions.js';

describe('skill actions', () => {
  describe('startCooldown', () => {
    it('should return an object with type "ON_COOLDOWN" and payload of the name passed in', () => {
      expect(startCooldown({skillName: 'slash'})).toEqual({type: 'ON_COOLDOWN', payload: 'slash'});
    });
  });

  describe('endCooldown', () => {
    it('should return an object with type "OFF_COOLDOWN" and payload of the name passed in', () => {
      expect(endCooldown({skillName: 'slash'})).toEqual({type: 'OFF_COOLDOWN', payload: 'slash'});
    });
  });

  describe('setSkills', () => {
    it('should return an object with type "SET_SKILLS" and payload of the class name passed in', () => {
      expect(setSkills('warriorSkills')).toEqual({type: 'SET_SKILLS', payload: 'warriorSkills'});
    });
  });

  describe('startGlobalCooldown', () => {
    it('should return an object with type "START_GLOBAL_COOLDOWN"', () => {
      expect(startGlobalCooldown()).toEqual({type: 'START_GLOBAL_COOLDOWN'});
    });
  });

  describe('endGlobalCooldown', () => {
    it('should return an object with type "END_GLOBAL_COOLDOWN"', () => {
      expect(endGlobalCooldown()).toEqual({type: 'END_GLOBAL_COOLDOWN'});
    });
  });

  describe('decrementEffectDurations', () => {
    it('should return an object with type "DECREMENT_EFFECT_DURATIONS"', () => {
      expect(decrementEffectDurations()).toEqual({type: 'DECREMENT_EFFECT_DURATIONS'});
    });
  });

  describe('refreshDuration', () => {
    it('should return an object with type of REFRESH_DURATION and a payload with effectName and duration', () => {
      expect(refreshDuration({effectName: 'test', duration: 2})).toEqual({
        type: 'REFRESH_DURATION',
        payload: {
          effectName: 'test',
          duration: 2
        }
      });
    });
  });
});
