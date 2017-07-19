'use strict';

import skillAndTargetsProcessor from '../../app/processors/skill-and-targets-processor.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';
import newMob from '../../app/data/mobs.js';

describe('skillAndTargetsProcessor', () => {
  const props = {
    skills: {
      ...warriorSkills,
      ...clericSkills,
    },
    combat: {
      active: true,
      targets: [newMob('bat')]
    }
  };

  describe('With an argument of "searing light bat"', () => {
    it('should return a skill of "searing light" and args of "bat"', () => {
      expect(skillAndTargetsProcessor('searing', 'light bat', props)).toEqual({
        targetedSkill: 'searing light',
        args: 'bat'
      });
    });
  });

  describe('With an argument of "searing bat"', () => {
    it('should return a skill of "searing light" and args of "bat"', () => {
      expect(skillAndTargetsProcessor('searing', 'bat', props)).toEqual({
        targetedSkill: 'searing light',
        args: 'bat'
      });
    });
  });

  describe('With an argument of "searing light"', () => {
    it('should return a skill of "searing light" and args of undefined', () => {
      expect(skillAndTargetsProcessor('searing', 'light', props)).toEqual({
        targetedSkill: 'searing light',
        args: undefined
      });
    });
  });

  describe('With an argument of "slash bat"', () => {
    it('should return a skill of "slash" and args of "bat"', () =>{
      expect(skillAndTargetsProcessor('slash', 'bat', props)).toEqual({
        targetedSkill: 'slash',
        args: 'bat'
      });
    });
  });
});
