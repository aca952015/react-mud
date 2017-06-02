'use strict';

import {itemData} from './items.js';

export const roomData = {
  'Nexus': {
    roomName: 'Nexus',
    desc: 'Welcome to the nexus.',
    exits: {
      down: {
        exit: 'Town Square',
        locked: false
      }
    },
    items: [itemData['health potion']]
  },
  'Town Square': {
    roomName: 'Town Square',
    desc: 'This is the town square.',
    exits: {
      up: {
        exit: 'Nexus',
        locked: false
      },
      east: {
        exit: 'Gallows',
        locked: true
      }
    },
    items: []
  },
  'Gallows': {
    roomName: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: {
        exit: 'Town Square',
        locked: true
      }
    },
    items: [itemData['health potion']]
  }
};
