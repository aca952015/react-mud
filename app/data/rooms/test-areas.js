'use strict';

import newItem, {itemData} from '../items.js';
import newMob from '../mobs.js';

export const testAreas = {
  'Test - Nexus': {
    roomName: 'Test - Nexus',
    roomTitle: 'Nexus',
    desc: 'Welcome to the nexus. Type HELP to get a list of commands available.',
    exits: {
      up: {
        exit: 'Test - Secret Room',
        locked: true,
        requiredKey: itemData['keys']['secret key']
      },
      down: {
        exit: 'Test - Town Square',
        locked: false
      }
    },
    items: [
      {...
        newItem('containers', 'corpse'),
        container: {
          contains: [newItem('potions', 'health potion'), newItem('potions', 'health potion')],
          holds: ['items', 'equipment']
        }
      },
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
      newItem('equipment', 'leather boots'),
      newItem('weapons', 'broad sword')
    ],
    examines: [{
      name: 'ztest',
      terms: ['ztest'],
      description: 'Really? Ztest? You thought to try looking at this?'
    }],
    mobs: [newMob('bat', 'Test - Nexus'), newMob('bat', 'Test - Nexus'), newMob('armored zombie', 'Test - Nexus'), newMob('healer', 'Test - Nexus')],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Test - Secret Room': {
    roomName: 'Test - Secret Room',
    roomTitle: 'Secret Room',
    desc: 'This room is a secret. You shouldn\'t be here.',
    exits: {
      down: {
        exit: 'Test - Nexus',
        locked: true,
        requiredKey: itemData['keys']['secret key']
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Test - Town Square': {
    roomName: 'Test - Town Square',
    roomTitle: 'Town Square',
    desc: 'This is the town square.',
    exits: {
      up: {
        exit: 'Test - Nexus',
        locked: false
      },
      east: {
        exit: 'Test - Gallows',
        locked: true,
        requiredKey: itemData['keys']['gallows key']
      }
    },
    items: [newItem('keys', 'useless key'), newItem('containers', 'backpack')],
    mobs: [newMob('bat', 'Test - Town Square'), newMob('bat', 'Test - Town Square')],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Test - Gallows': {
    roomName: 'Test - Gallows',
    roomTitle: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: {
        exit: 'Test - Town Square',
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
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  }
};
