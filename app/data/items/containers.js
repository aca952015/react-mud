'use strict';

export const containers = {
  'backpack': {
    name: 'backpack',
    short: 'a backpack',
    long: 'A simple backpack lies on the ground here.',
    terms: ['backpack', 'simple'],
    category: 'containers',
    type: 'items',
    drink: null,
    description: 'This is a placeholder description for a backpack.',
    container: {
      holds: ['items', 'equipment', 'weapons'],
      contains: []
    }
  },
  'corpse': {
    name: 'corpse',
    short: 'a corpse',
    long: 'A corpse lies here.',
    terms: ['corpse'],
    category: 'containers',
    drink: null,
    type: 'corpse',
    description: 'This is a placeholder description for a corpse.',
    container: {
      holds: ['items', 'equipment', 'weapons'],
      contains: []
    }
  },
  'glass flask': {
    name: 'glass flask',
    short: 'a glass flask',
    long: 'A glass flask sits on the ground here.',
    terms: ['glass', 'flask'],
    category: 'containers',
    type: 'items',
    drink: null,
    description: 'This is a placeholder description for a glass flask.',
    container: {
      holds: ['liquid'],
      contains: []
    }
  }
};
