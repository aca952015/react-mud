'use strict';

import newItem, {itemData} from '../items.js';
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
        exit: 'Combat Training Hall',
        locked: false
      },
      east: {
        exit: 'Movement Training Hall',
        locked: false
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Combat Training Hall': {
    roomName: 'Combat Training Hall',
    desc: 'A statue of an armored warrior stands in the center of an open space that branches out in all directions. The statue has a shield held prominently in front of it, with a sword drawn back, frozen in a perpetually ready state for combat. To the east, a hallway runs back to the academy foyer. The other exits are all made up of strong wooden doors, with two iron strips running across each. Set into the floor is a cellar door with a ring pull on it. A quiet, steady, muffled hum pervades the room.',
    exits: {
      east: {
        exit: 'Academy Foyer',
        locked: false
      },
      north: {
        exit: 'Skill Room',
        locked: false
      },
      west: {
        exit: 'Combat Basics',
        locked: false
      }
    },
    items: [newItem('doodads', 'combat training directions')],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Combat Basics': {
    roomName: 'Combat Basics',
    desc: 'A steady, low-level hum reverberates around this stone room, its source indeterminable. There\'s a slightly electric, tingling sensation in the air, along with the faint scent of ozone. A few faded bloodstains have been painted against the floor and the patchwork of stones. To the East, an archway leads back out into the central combat training hall, while another archway leads to a room similar to this one to the North.',
    exits: {
      east: {
        exit: 'Combat Training Hall',
        locked: false
      },
      north: {
        exit: 'Room of Animation',
        locked: false
      }
    },
    items: [newItem('doodads', 'combat basics sign')],
    mobs: [newMob('animated dummy')],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Room of Animation': {
    roomName: 'Room of Animation',
    desc: 'Many animated dummies',
    exits: {
      south: {
        exit: 'Combat Basics',
        locked: false
      }
    },
    items: [],
    mobs: [newMob('animated dummy'), newMob('animated dummy'), newMob('animated dummy'), newMob('animated dummy')],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Skill Room': {
    roomName: 'Skill Room',
    desc: 'A room to train users in how to use skills.',
    exits: {
      south: {
        exit: 'Combat Training Hall',
        locked: false
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Movement Training Hall': {
    roomName: 'Movement Training Hall',
    desc: 'The movement hall.',
    exits: {
      west: {
        exit: 'Academy Foyer',
        locked: false
      },
      east: {
        exit: 'Get Room',
        locked: false
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Get Room': {
    roomName: 'Get Room',
    desc: 'The room where players learn how to get items.',
    exits: {
      west: {
        exit: 'Movement Training Hall',
        locked: false
      },
      north: {
        exit: 'Get From Container Room',
        locked: true,
        requiredKey: itemData['keys']['academy key']
      }
    },
    items: [newItem('keys', 'academy key')],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  },
  'Get From Container Room': {
    roomName: 'Get From Container Room',
    desc: 'The room where players learn how to get from containers.',
    exits: {
      south: {
        exit: 'Get Room',
        locked: true,
        requiredKey: itemData['keys']['academy key']
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0
  }
};
