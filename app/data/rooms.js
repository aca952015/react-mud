'use strict';

import newItem, {itemData} from './items.js';
import newMob from './mobs.js';

export const roomData = {
  'Nexus': {
    roomName: 'Nexus',
    desc: 'Welcome to the nexus. Type HELP to get a list of commands available.',
    exits: {
      up: {
        exit: 'Secret Room',
        locked: true,
        requiredKey: itemData['secret key']
      },
      down: {
        exit: 'Town Square',
        locked: false
      }
    },
    items: [
      newItem('corpse'),
      {
        ...newItem('backpack'),
        container: {
          contains: [newItem('corpse'), newItem('health potion'), newItem('mana potion')],
          holds: ['items', 'equipment']
        }
      },
      {
        ...newItem('backpack'),
        container: {
          contains: [newItem('health potion'), newItem('mana potion')],
          holds: ['items', 'equipment']
        }
      },
      newItem('health potion'),
      newItem('gallows key'),
      newItem('health potion'),
      newItem('tester key'),
      newItem('mana potion'),
      newItem('leather helm', 'equipment'),
      newItem('leather helm', 'equipment')
    ],
    examines: [{
      name: 'ztest',
      terms: ['ztest'],
      description: 'Really? Ztest? You thought to try looking at this?'
    }],
    mobs: [newMob('bat'), newMob('bat')]
  },
  'Secret Room': {
    roomName: 'Secret Room',
    desc: 'This room is a secret. You shouldn\'t be here.',
    exits: {
      down: {
        exit: 'Nexus',
        locked: true,
        requiredKey: itemData['secret key']
      }
    },
    items: [],
    mobs: []
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
    items: [newItem('useless key'), newItem('backpack')],
    mobs: [newMob('bat'), newMob('bat')]
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
    items: [newItem('health potion')],
    examines: [{
      name: 'the gallows',
      terms: ['gallows'],
      description: 'It\'s a gallows, with a short noose hanging from it.'
    }],
    mobs: []
  }
};
