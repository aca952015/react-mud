'use strict';

import {mobSkills} from '../mob-skills.js';

export const testMobs = {
  'bat': {
    name: 'bat',
    description: 'It\'s a bat. It\'s here for testing.',
    short: 'a small bat',
    long: 'A small, leathery-winged bat is here.',
    terms: ['small', 'bat'],
    hp: 5,
    maxHP: 5,
    atk: 5,
    mat: 1,
    def: 0,
    mdf: 0,
    effects: {},
    skills: {
      'bash': mobSkills['bash']
    },
    drops: []
  },
  'armored zombie': {
    name: 'armored zombie',
    description: 'It\'s a zombie with armor on, here to test a mob with some def.',
    short: 'an armored zombie',
    long: 'A zombie that\'s been outfitted with some leather armor is here.',
    terms: ['armored', 'zombie'],
    hp: 10,
    maxHP: 10,
    atk: 2,
    mat: 1,
    def: 3,
    mdf: 0,
    effects: {},
    skills: {},
    drops: [{
      category: 'potions',
      name: 'health potion',
      chance: 0.5
    }]
  }
};
