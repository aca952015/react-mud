'use strict';

import {restoreStat} from '../actions/item-actions.js';

class Item {
  constructor(properties) {
    Object.keys(properties).forEach(property => this[property] = properties[property]);
    this.id = Math.floor(Math.random() * 1000000000);
  }
}

export default function newItem(itemName) {
  return new Item(itemData[itemName]);
}

export const itemData = {
  'health potion': {
    name: 'health potion',
    short: 'a red potion',
    long: 'A flask, with a v-shaped bottom and a thin neck, filled with a red liquid, sits on the ground here.',
    terms: ['potion', 'red', 'flask', 'health'],
    type: 'items',
    drink: {
      effect: restoreStat,
      statToChange: 'hp',
      amount: 10,
      desc: 'A soothing glow passes over you, healing some of your wounds.'
    },
    description: 'This is a placeholder description for a health potion.'
  },
  'backpack': {
    name: 'backpack',
    short: 'a backpack',
    long: 'A simple backpack lies on the groud here.',
    terms: ['backpack', 'simple'],
    type: 'items',
    drink: null,
    description: 'This is a placeholder description for a backpack.',
    container: {
      holds: ['items'],
      contains: []
    }
  },
  'corpse': {
    name: 'corpse',
    short: 'a corpse',
    long: 'A corpse lies here.',
    terms: ['corpse'],
    drink: null,
    type: 'corpse',
    description: 'This is a placeholder description for a corpse.',
    container: {
      holds: ['items'],
      contains: []
    }
  },
  'mana potion': {
    name: 'mana potion',
    short: 'a blue potion',
    long: 'A spherical container with a short neck, filled with a blue liquid, sits on the ground here.',
    terms: ['potion', 'blue', 'container', 'mana'],
    type: 'items',
    drink: {
      effect: restoreStat,
      statToChange: 'mp',
      amount: 10,
      desc: 'A cool sensation washes over you, restoring some of your magical energy.'
    },
    description: 'This is still a placeholder description for a mana potion.'
  },
  'glass flask': {
    name: 'glass flask',
    short: 'a glass flask',
    long: 'A glass flask sits on the ground here.',
    terms: ['glass', 'flask'],
    type: 'items',
    drink: null,
    description: 'This is a placeholder description for a glass flask.',
    container: {
      holds: ['liquid'],
      contains: []
    }
  },
  'gallows key': {
    name: 'gallows key',
    short: 'a small black key',
    type: 'items',
    long: 'A small black key with a simple carving of a noose on it lies here.',
    terms: ['key', 'black', 'small'],
    drink: null,
    description: 'This is a placeholder description for a gallows key.'
  },
  'secret key': {
    name: 'secret key',
    short: 'THE SECRET KEY',
    type: 'items',
    long: 'A key with the creator\'s symbol on it is lying on the ground here.',
    terms: ['key', 'secret', 'creator'],
    drink: null,
    description: 'This is a secret key! You should not be holding it.'
  },
  'useless key': {
    name: 'useless key',
    short: 'a useless key',
    type: 'items',
    long: 'A useless key whose teeth have been completely worn off lies here.',
    terms: ['useless', 'key'],
    drink: null,
    description: 'This is a placeholder description for a useless key.'
  },
  'tester key': {
    name: 'tester key',
    short: 'a tester\'s key',
    type: 'items',
    long: 'A key with divine engravings on it lies here.',
    terms: ['tester', 'tester\'s', 'key'],
    drink: null,
    description: 'This is a placeholder description for a tester key.'
  }
};
