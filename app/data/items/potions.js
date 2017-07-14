'use strict';

import {restoreStat} from '../../actions/item-actions.js';

export const potions = {
  'health potion': {
    name: 'health potion',
    short: 'a red potion',
    long: 'A flask, with a v-shaped bottom and a thin neck, filled with a red liquid, sits on the ground here.',
    terms: ['potion', 'red', 'flask', 'health'],
    category: 'potions',
    type: 'items',
    drink: {
      effect: restoreStat,
      statToChange: 'hp',
      amount: 10,
      desc: 'A soothing glow passes over you, healing some of your wounds.'
    },
    description: 'This is a placeholder description for a health potion.'
  },
  'mana potion': {
    name: 'mana potion',
    short: 'a blue potion',
    long: 'A spherical container with a short neck, filled with a blue liquid, sits on the ground here.',
    terms: ['potion', 'blue', 'container', 'mana'],
    category: 'potions',
    type: 'items',
    drink: {
      effect: restoreStat,
      statToChange: 'mp',
      amount: 10,
      desc: 'A cool sensation washes over you, restoring some of your magical energy.'
    },
    description: 'This is still a placeholder description for a mana potion.'
  }
};
