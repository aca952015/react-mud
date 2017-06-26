'use strict';

import {restoreStat} from '../actions/item-actions.js';

export default function newItem(itemName) {
  class Item {
    constructor(properties) {
      Object.keys(properties).forEach(property => this[property] = properties[property]);
      this.id = Math.floor(Math.random() * 1000000000);
    }
  }

  return new Item(itemData[itemName]);
}

export const itemData = {
  'health potion': {
    name: 'health potion',
    short: 'a red potion',
    long: 'A flask, with a v-shaped bottom and a thin neck, filled with a red liquid, sits on the ground here.',
    terms: ['potion', 'red', 'flask', 'health'],
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
    drink: {
      effect: restoreStat,
      statToChange: 'mp',
      amount: 10,
      desc: 'A cool sensation washes over you, restoring some of your magical energy.'
    },
    description: 'This is a placeholder description for a mana potion.'
  },
  'empty flask': {
    name: 'empty flask',
    short: 'an empty flask',
    long: 'An empty glass flask sits on the ground here.',
    terms: ['empty', 'glass', 'flask'],
    drink: null,
    description: 'This is a placeholder description for an empty flask.'
  },
  'gallows key': {
    name: 'gallows key',
    short: 'a small black key',
    long: 'A small black key with a simple carving of a noose on it lies here.',
    terms: ['key', 'black', 'small'],
    drink: null,
    description: 'This is a placeholder description for a gallows key.'
  },
  'secret key': {
    name: 'secret key',
    short: 'THE SECRET KEY',
    long: 'A key with the creator\'s symbol on it is lying on the ground here.',
    terms: ['key', 'secret', 'creator'],
    drink: null,
    description: 'This is a secret key! You should not be holding it.'
  },
  'useless key': {
    name: 'useless key',
    short: 'a useless key',
    long: 'A useless key whose teeth have been completely worn off lies here.',
    terms: ['useless', 'key'],
    drink: null,
    description: 'This is a placeholder description for a useless key.'
  },
  'tester key': {
    name: 'tester key',
    short: 'a tester\'s key',
    long: 'A key with divine engravings on it lies here.',
    terms: ['tester', 'tester\'s', 'key'],
    drink: null,
    description: 'This is a placeholder description for a tester key.'
  }
};
