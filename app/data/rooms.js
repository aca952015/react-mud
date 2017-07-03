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
        requiredKey: itemData['keys']['secret key']
      },
      down: {
        exit: 'Town Square',
        locked: false
      }
    },
    items: [
      newItem('containers', 'corpse'),
      {
        ...newItem('containers', 'backpack'),
        container: {
          contains: [newItem('containers', 'corpse'), newItem('potions', 'health potion'), newItem('potions', 'mana potion')],
          holds: ['items', 'equipment']
        }
      },
      {
        ...newItem('containers', 'backpack'),
        container: {
          contains: [newItem('potions', 'health potion'), newItem('potions', 'mana potion')],
          holds: ['items', 'equipment']
        }
      },
      newItem('potions', 'health potion'),
      newItem('keys', 'gallows key'),
      newItem('potions', 'health potion'),
      newItem('keys', 'tester key'),
      newItem('potions', 'mana potion'),
      newItem('equipment', 'leather helm'),
      newItem('equipment', 'leather helm'),
      newItem('equipment', 'leather pauldrons'),
      newItem('equipment', 'leather breastplate'),
      newItem('equipment', 'leather leggings'),
      newItem('equipment', 'leather boots')
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
        requiredKey: itemData['keys']['secret key']
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
        requiredKey: itemData['keys']['gallows key']
      }
    },
    items: [newItem('keys', 'useless key'), newItem('containers', 'backpack')],
    mobs: [newMob('bat'), newMob('bat')]
  },
  'Gallows': {
    roomName: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: {
        exit: 'Town Square',
        locked: true,
        requiredKey: itemData['keys']['gallows key']
      }
    },
    items: [newItem('potions', 'health potion')],
    examines: [{
      name: 'the gallows',
      terms: ['gallows'],
      description: 'It\'s a gallows, with a short noose hanging from it.'
    }],
    mobs: []
  }
};
