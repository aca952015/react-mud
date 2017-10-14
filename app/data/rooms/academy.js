'use strict';

import newItem, {itemData} from '../items.js';
import newMob from '../mobs.js';

export const academy = {
  'Academy - Academy Entrance': {
    roomName: 'Academy - Academy Entrance',
    roomTitle: 'Academy Entrance',
    desc: 'Simple wooden columns flank the entrance into Tempest\'s training academy, stretching up to a high ceiling. A pair of crossed swords sits above a fireplace, resting off to one side, a quietly crackling flame warming the walkway as it approaches the foyer to the North. To the South, a large, oak-framed doorway leads back out into the rainy cobblestone streets.',
    exits: {
      north: {
        exit: 'Academy - Academy Foyer',
        locked: false
      },
      south: {
        exit: 'Streets - Academy Entrance',
        locked: false
      }
    },
    items: [newItem('doodads', 'academy entrance sign')],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Academy Foyer': {
    roomName: 'Academy - Academy Foyer',
    roomTitle: 'Academy Foyer',
    desc: 'A large marble floor stretches across the foyer here, merging into a stone hallway to the West and wooden floors to the South and East. A fireplace is embedded against the far wall to the North. Stone columns run from the floor up to the ceiling, a few of them chipped and marked at various points in their length. A musty smell pervades the room - an indication of some large mold growths from somewhere unseen.',
    exits: {
      east: {
        exit: 'Academy - Movement Hall',
        locked: false
      },
      south: {
        exit: 'Academy - Academy Entrance',
        locked: false
      },
      west: {
        exit: 'Academy - Combat Training Hall',
        locked: false
      }
    },
    items: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Combat Training Hall': {
    roomName: 'Academy - Combat Training Hall',
    roomTitle: 'Combat Training Hall',
    desc: 'A statue of an armored warrior stands in the center of an open space that branches out in all directions. The statue has a shield held prominently in front of it, with a sword drawn back, frozen in a perpetually ready state for combat. To the east, a hallway runs back to the academy foyer. The other exits are all made up of strong wooden doors, with two iron strips running across each. Set into the floor is a cellar door with a ring pull on it. A quiet, steady, muffled hum pervades the room.',
    exits: {
      north: {
        exit: 'Academy - Skill Room',
        locked: false
      },
      east: {
        exit: 'Academy - Academy Foyer',
        locked: false
      },
      west: {
        exit: 'Academy - Combat Basics',
        locked: false
      }
    },
    items: [newItem('doodads', 'combat training directions')],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Combat Basics': {
    roomName: 'Academy - Combat Basics',
    roomTitle: 'Combat Basics',
    desc: 'A steady, low-level hum reverberates around this stone room, its source indeterminable. There\'s a slightly electric, tingling sensation in the air, along with the faint scent of ozone. A few faded bloodstains have been painted against the floor and the patchwork of stones. To the East, an archway leads back out into the central combat training hall, while another archway leads to a room similar to this one to the North.',
    exits: {
      north: {
        exit: 'Academy - Room of Animation',
        locked: false
      },
      east: {
        exit: 'Academy - Combat Training Hall',
        locked: false
      }
    },
    items: [newItem('doodads', 'combat basics sign')],
    mobs: [newMob('animated dummy', 'Academy - Combat Basics')],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Room of Animation': {
    roomName: 'Academy - Room of Animation',
    roomTitle: 'Room of Animation',
    desc: 'The crackle of magic echoes through this room as occasional sparks of purple light pop into view, then fade away. The tingle of static pervades everywhere, yet somehow manages to never discharge. Stone blocks line the walls, floor, and ceiling, coming together in a dome shape. Various scraps of battered and beaten equipment lie around the room, occasionally tugging at each other with little arcs of magical energy. The only exit lies back to the South.',
    exits: {
      south: {
        exit: 'Academy - Combat Basics',
        locked: false
      }
    },
    items: [],
    mobs: [
      newMob('animated dummy', 'Academy - Room of Animation'),
      newMob('animated dummy', 'Academy - Room of Animation'),
      newMob('animated dummy', 'Academy - Room of Animation'),
      newMob('animated dummy', 'Academy - Room of Animation')
    ],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Skill Room': {
    roomName: 'Academy - Skill Room',
    roomTitle: 'Skill Room',
    desc: 'A heavy wooden door, with iron strips running across it, guards the only entrance and exit for this room. A sloped, stone roof echoes gently with the sound of rain outside. The air is much fresher than in the combat training hall, with a light breeze seeping in through cracks in the stone walls. A quiet, low-level, constant hum seems to sound from nowhere, reverberating around the room gently.',
    exits: {
      south: {
        exit: 'Academy - Combat Training Hall',
        locked: false
      }
    },
    items: [],
    mobs: [newMob('animated dummy', 'Academy - Skill Room'), newMob('animated dummy', 'Academy - Skill Room')],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Movement Hall': {
    roomName: 'Academy - Movement Hall',
    roomTitle: 'Movement Hall',
    desc: 'Wooden floors, beginning to warp near the walls from moisture damage, stretch out in all directions. A slightly moldy smell occasionally wafts through this large, open space. To the East, the hall narrows down into an open doorway leading into a smaller chamber, while to the West, the floor leads into the foyer of the academy.',
    exits: {
      east: {
        exit: 'Academy - Get Room',
        locked: false
      },
      west: {
        exit: 'Academy - Academy Foyer',
        locked: false
      }
    },
    items: [newItem('doodads', 'movement hall directions')],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Get Room': {
    roomName: 'Academy - Get Room',
    roomTitle: 'Small Room',
    desc: 'A heavy door stands between this room and the one to the North, an intricately shaped keyhole resting just beneath a large knocker on the right side. Wooden boards cover the floor, through some have begun to twist and warp from moisture damage. Stone walls stretch up towards the ceiling, a latticework of beams that have been reinforced with steel joints. To the West, a doorway opens up into a larget chamber.',
    exits: {
      north: {
        exit: 'Academy - Get From Container Room',
        locked: true,
        requiredKey: itemData['keys']['academy key']
      },
      west: {
        exit: 'Academy - Movement Hall',
        locked: false
      }
    },
    items: [newItem('keys', 'academy key'), newItem('doodads', 'get sign')],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Get From Container Room': {
    roomName: 'Academy - Get From Container Room',
    roomTitle: 'Confined Room',
    desc: 'This space is relatively small, the ceiling having a sharp slope down until it meets the floor, with no intervening wall on that side. The wooden floors are gnarled and warped, with a small hole leading down into darkness near the corner. A simple door stands to the East, a keyhole set in place on the right hand side. A sturdier, heavier door leads back to the South.',
    exits: {
      east: {
        exit: 'Academy - Equipment Room',
        locked: true,
        requiredKey: itemData['keys']['container key']
      },
      south: {
        exit: 'Academy - Get Room',
        locked: true,
        requiredKey: itemData['keys']['academy key']
      }
    },
    items: [
      {
        ...newItem('containers', 'backpack'),
        container: {
          holds: ['items', 'equipment', 'weapons'],
          contains: [newItem('keys', 'container key')]
        }
      },
      newItem('doodads', 'container sign'),
      newItem('doodads', 'examine sign')
    ],
    examines: [{
      name: 'hole',
      terms: ['hole'],
      description: 'A small hole, the size of a coin, leads down into pitch blackness. The edges are jagged, as if something chewed away at the wood.'
    }],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Academy - Equipment Room': {
    roomName: 'Academy - Equipment Room',
    roomTitle: 'Equipment Room',
    desc: 'A storage space, almost more a closet than a room, sits here. With solid stone walls all around and a low roof, the only light that enters is from the West when the door is open. The air is stale and dry, a haze of dust floating around and settling against everything.',
    exits: {
      west: {
        exit: 'Academy - Get From Container Room',
        locked: true,
        requiredKey: itemData['keys']['container key']
      }
    },
    items: [
      newItem('doodads', 'equipment sign'),
      newItem('equipment', 'leather helm'),
      newItem('equipment', 'leather pauldrons'),
      newItem('equipment', 'leather breastplate'),
      newItem('equipment', 'leather leggings'),
      newItem('equipment', 'leather boots'),
      newItem('weapons', 'broad sword')
    ],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  }
};
