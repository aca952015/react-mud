'use strict';

export const nonCombatNPCs = {
  'healer': {
    name: 'healer',
    description: 'This healer is here to resurrect dead players. If you have died, type RESURRECT and she will restore you to life.',
    short: 'a white-robed healer',
    long: 'A healer, dressed in long, flowing white robes, stands here, ready to revive fallen players.',
    terms: ['healer', 'white', 'robed', 'white-robed'],
    hp: 500,
    maxHP: 500,
    atk: 50,
    mat: 50,
    def: 50,
    mdf: 50,
    nonCombat: true,
    effects: {},
    drops: []
  }
};
