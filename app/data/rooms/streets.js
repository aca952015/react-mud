'use strict';

export const streets = {
  'Streets - Academy Entrance': {
    roomName: 'Streets - Academy Entrance',
    roomTitle: 'Before the Academy',
    desc: 'A sharply peaked eve rests over the entrance to a stone building to the North, stretching down to just above street level. Heavy rain cascades down either side, before running to a grated drain near the intersection of streets. Some of the cobblestone walkway has been worn away, holes revealing deeply muddied patches of earth. To the South, the street stretches towards the town center.',
    exits: {
      north: {
        exit: 'Academy - Academy Entrance',
        locked: false
      },
      east: {
        exit: 'Streets - Aylan Street E1',
        locked: false
      },
      west: {
        exit: 'Streets - Aylan Street W1',
        locked: false
      }
    },
    items: [],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Streets - Aylan Street E1': {
    roomName: 'Streets - Aylan Street E1',
    roomTitle: 'East Aylan Street',
    desc: '',
    exits: {
      west: {
        exit: 'Streets - Academy Entrance',
        locked: false
      }
    },
    items: [],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  },
  'Streets - Aylan Street W1': {
    roomName: 'Streets - Aylan Street W1',
    roomTitle: 'West Aylan Street',
    desc: '',
    exits: {
      east: {
        exit: 'Streets - Academy Entrance',
        locked: false
      }
    },
    items: [],
    examines: [],
    mobs: [],
    itemResetTimer: 0,
    mobResetTimer: 0,
    lockedExitTimer: 0
  }
};
