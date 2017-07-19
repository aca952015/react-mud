'use strict';

import reducer from '../../app/reducers/skill-reducer.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';

describe('skills reducer', () => {
  it('should have an initialState of an empty object', () => {
    expect(reducer(undefined, {})).toEqual({...warriorSkills, ...clericSkills});
  });

  describe('With an action of "ON_COOLDOWN"', () => {
    it('should set the passed in skill onCooldown to true', () => {
      expect(reducer({slash: {onCooldown: false}}, {type: 'ON_COOLDOWN', payload: 'slash'})).toEqual({
        slash: {onCooldown: true}
      });
    });
  });

  describe('With an action of "OFF_COOLDOWN"', () => {
    it('should set the passed in skill onCooldown to false', () => {
      expect(reducer({slash: {onCooldown: true}}, {type: 'OFF_COOLDOWN', payload: 'slash'})).toEqual({
        slash: {onCooldown: false}
      });
    });
  });

  describe('With an action of SET_SKILLS', () => {
    it('should return an object of the associated class skill list', () => {
      expect(reducer(undefined, {type: 'SET_SKILLS', payload: 'warriorSkills'})).toEqual(warriorSkills);
    });
  });

  describe('With an action of START_GLOBAL_COOLDOWN', () => {
    it('should set globalCooldown to true', () => {
      expect(reducer(undefined, {type: 'START_GLOBAL_COOLDOWN'})).toEqual({...warriorSkills, ...clericSkills, globalCooldown: true});
    });
  });

  describe('With an action of END_GLOBAL_COOLDOWN', () => {
    it('should set globalCooldown to false', () => {
      expect(reducer({globalCooldown: false}, {type: 'END_GLOBAL_COOLDOWN'})).toEqual({globalCooldown: false});
    });
  });
});
