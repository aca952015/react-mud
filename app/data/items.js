'use strict';

import {restoreHealth, restoreMana} from '../actions/item-actions.js';

export const itemData = {
  'health potion': {
    name: 'health potion',
    short: 'a red potion',
    long: 'A flask, with a v-shaped bottom and a thin neck, filled with a red liquid, sits on the ground here.',
    terms: ['potion', 'red', 'flask', 'health'],
    drink: {
      effect: restoreHealth,
      amount: 10,
      desc: 'A soothing glow passes over you, healing some of your wounds.'
    }
  },
  'mana potion': {
    name: 'mana potion',
    short: 'a blue potion',
    long: 'A spherical container with a short neck, filled with a blue liquid, sits on the ground here.',
    terms: ['potion', 'blue', 'container', 'mana'],
    drink: {
      effect: restoreMana,
      amount: 10,
      desc: 'A cool sensation washes over you, restoring some of your magical energy.'
    }
  },
  'gallows key': {
    name: 'gallows key',
    short: 'a small black key',
    long: 'A small black key with a simple carving of a noose on it lies here.',
    terms: ['key', 'black', 'small'],
    drink: null
  },
  'useless key': {
    name: 'useless key',
    short: 'a useless key',
    long: 'A useless key whose teeth have been completely worn off lies here.',
    terms: ['useless', 'key'],
    drink: null
  },
  'tester key': {
    name: 'tester key',
    short: 'a tester\'s key',
    long: 'A key with divine engravings on it lies here.',
    terms: ['tester', 'tester\'s', 'key'],
    drink: null
  }
};
