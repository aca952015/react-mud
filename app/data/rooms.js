'use strict';

import {itemData} from './items.js';

export const roomData = {
  'Nexus': {
    roomName: 'Nexus',
    desc: 'Welcome to the nexus.',
    exits: {
      down: 'Town Square'
    },
    items: [itemData['health potion']]
  },
  'Town Square': {
    roomName: 'Town Square',
    desc: 'This is the town square.',
    exits: {
      up: 'Nexus',
      east: 'Gallows'
    },
    items: []
  },
  'Gallows': {
    roomName: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: 'Town Square'
    },
    items: [itemData['health potion']]
  }
};
