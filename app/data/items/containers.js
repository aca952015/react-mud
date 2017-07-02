'use strict';

export const containers = {
  'backpack': {
    name: 'backpack',
    short: 'a backpack',
    long: 'A simple backpack lies on the groud here.',
    terms: ['backpack', 'simple'],
    type: 'items',
    drink: null,
    description: 'This is a placeholder description for a backpack.',
    container: {
      holds: ['items', 'equipment'],
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
      holds: ['items', 'equipment'],
      contains: []
    }
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
  }
};
