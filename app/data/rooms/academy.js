'use strict';

import newItem from '../items.js';
import newMob from '../mobs.js';

export const academy = {
  'Academy Entrance': {
    roomName: 'Academy Entrance',
    desc: 'Simple wooden columns flank the entrance into Tempest\'s training academy, stretching up to a high ceiling. A pair of crossed swords sits above a fireplace, resting off to one side, a quietly crackling flame warming the walkway as it approaches the foyer to the North. To the South, a large, oak-framed doorway leads back out into the rainy cobblestone streets.',
    exits: {
      north: {
        exit: 'Academy Foyer',
        locked: false
      },
    },
    items: [newItem('doodads', 'academy entrance sign')],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
};
