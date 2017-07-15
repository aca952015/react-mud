'use strict';

import {startCooldown, endCooldown, setSkills} from '../../app/actions/skill-actions.js';

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
});
