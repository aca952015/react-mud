'use strict';

import {testAreas} from './rooms/test-areas.js';
import {academy} from './rooms/academy.js';

export const roomData = {
  ...testAreas,
  ...academy,
  'Login Room': {
    roomName: 'Login Room',
    roomTitle: 'Welcome to Tempest',
    desc: 'To make a new character, type "new". To login to an existing character, enter the character\'s name.',
    exits: {},
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  }
};
