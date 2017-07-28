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
  'Academy Foyer': {
    roomName: 'Academy Foyer',
    desc: 'A large marble floor stretches across the foyer here, merging into a stone hallway to the West and wooden floors to the South and East. A fireplace is embedded against the far wall to the North. Stone columns run from the floor up to the ceiling, a few of them chipped and marked at various points in their length. A musty smell pervades the room - an indication of some large mold growths from somewhere unseen.',
    exits: {
      south: {
        exit: 'Academy Entrance',
        locked: false
      },
      west: {
        exit: 'Hallway to Combat Training',
        locked: false
      },
      east: {
        exit: 'Hallway to Movement Training',
        locked: false
      }
    }
  }
};
