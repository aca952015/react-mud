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
      south: {
        exit: 'Streets - Elblum Street S1',
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
  'Streets - Elblum Street S1': {
    roomName: 'Streets - Elblum Street S1',
    roomTitle: 'North Elblum Street',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Academy Entrance',
        locked: false
      },
      south: {
        exit: 'Streets - Elblum Street S2',
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
  'Streets - Elblum Street S2': {
    roomName: 'Streets - Elblum Street S2',
    roomTitle: 'North Elblum Street',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Elblum Street S1',
        locked: false
      },
      south: {
        exit: 'Streets - Town Square',
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
  'Streets - Town Square': {
    roomName: 'Streets - Town Square',
    roomTitle: 'Town Square',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Elblum Street S2',
        locked: false
      },
      east: {
        exit: 'Streets - Silth Street E1',
        locked: false
      },
      south: {
        exit: 'Streets - Elblum Street S3',
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
  'Streets - Silth Street E1': {
    roomName: 'Streets - Silth Street E1',
    roomTitle: 'East Silth Street',
    desc: '',
    exits: {
      east: {
        exit: 'Streets - Silth Street E2',
        locked: false
      },
      west: {
        exit: 'Streets - Town Square',
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
  'Streets - Silth Street E2': {
    roomName: 'Streets - Silth Street E2',
    roomTitle: 'East Silth Street',
    desc: '',
    exits: {
      west: {
        exit: 'Streets - Silth Street E1',
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
  'Streets - Elblum Street S3': {
    roomName: 'Streets - Elblum Street S3',
    roomTitle: 'South Elblum Street',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Town Square',
        locked: false
      },
      south: {
        exit: 'Streets - Elblum Street S4',
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
  'Streets - Elblum Street S4': {
    roomName: 'Streets - Elblum Street S4',
    roomTitle: 'South Elblum Street',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Elblum Street S3',
        locked: false
      },
      south: {
        exit: 'Streets - Mage Guild Entrance',
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
  'Streets - Mage Guild Entrance': {
    roomName: 'Streets - Mage Guild Entrance',
    roomTitle: 'Entrance to the Mage Guild',
    desc: '',
    exits: {
      north: {
        exit: 'Streets - Elblum Street S4',
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
      east: {
        exit: 'Streets - Aylan Street E2',
        locked: false
      },
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
  'Streets - Aylan Street E2': {
    roomName: 'Streets - Aylan Street E2',
    roomTitle: 'East Aylan Street',
    desc: '',
    exits: {
      east: {
        exit: 'Streets - Temple of the Beast Entrance',
        locked: false
      },
      west: {
        exit: 'Streets - Aylan Street E1',
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
  'Streets - Temple of the Beast Entrance': {
    roomName: 'Streets - Temple of the Beast Entrance',
    roomTitle: 'Before the Temple of the Beast',
    desc: '',
    exits: {
      west: {
        exit: 'Streets - Aylan Street E2',
        locked: false
      }
    }
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
