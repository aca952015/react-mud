'use strict';

export const roomData = {
  'Nexus': {
    roomName: 'Nexus',
    desc: 'Welcome to the nexus.',
    exits: {
      down: 'Town Square'
    }
  },
  'Town Square': {
    roomName: 'Town Square',
    desc: 'This is the town square.',
    exits: {
      up: 'Nexus',
      east: 'Gallows'
    }
  },
  'Gallows': {
    roomName: 'Gallows',
    desc: 'People are hanged here.',
    exits: {
      west: 'Town Square'
    }
  }
};
