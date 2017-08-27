'use strict';

import {mobSkills} from '../mob-skills.js';

export const academyMobs = {
  'animated dummy': {
    name: 'animated dummy',
    description: 'A collection of old, worn-down armor and a blunted sword held together in the shape of a human, this dummy is constructed from a force of magic binding it all into place.',
    short: 'an animated dummy',
    long: 'An animated dummy, made up of bits of old armor bound together by magic, floats around here.',
    terms: ['dummy', 'animated'],
    hp: 10,
    maxHP: 10,
    atk: 1,
    def: 0,
    mdf: 0,
    effects: {},
    skills: {
      'bash': mobSkills['bash']
    }
  }
};
