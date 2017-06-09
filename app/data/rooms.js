'use strict';

import {itemData} from './items.js';

export const roomData = {
  'Nexus': {
    roomName: 'Nexus',
    desc: 'Welcome to the nexus. Type HELP to get a list of commands available.',
    exits: {
      down: {
        exit: 'Town Square',
        locked: false
      }
    },
    items: [itemData['health potion'], itemData['gallows key'], itemData['health potion'], itemData['tester key'], itemData['mana potion']]
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
        locked: true,
        requiredKey: itemData['gallows key']
      }
    },
    items: [itemData['useless key']]
  },
  'Gallows': {
    roomName: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: {
        exit: 'Town Square',
        locked: true,
        requiredKey: itemData['gallows key']
      }
    },
    items: [itemData['health potion']],
    examines: [{
      terms: 'gallows',
      description: 'It\'s a gallows, with a short noose hanging from it.'
    }]
  }
};
