'use strict';

import newItem from '../items.js';
import newMob from '../mobs.js';

export const Academy = {
  'Academy Entrance': {
    roomName: 'Academy Entrance',
    desc: 'This is the training academy. Here, you can learn about how to move around and interact with the world of Tempest. Type HELP for a list of topics to learn more about.',
    exits: {
      north: {
        exit: 'Academy Foyer',
        locked: false
      },
    },
    items: [],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
};
