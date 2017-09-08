'use strict';

import {roomData} from '../data/rooms.js';

export default function lockedExitProcessor(currentExits) {
  const oppositeExits = {
    'up': 'down',
    'down': 'up',
    'east': 'west',
    'west': 'east',
    'north': 'south',
    'south': 'north'
  };

  const exitsToLock = [];
  const exits = Object.entries(currentExits);

  for (let i = 0; i < exits.length; i++) {
    const currentExit = exits[i][1];
    if (currentExit.requiredKey && !currentExit.locked) {
      const directionToLock = exits[i][0];

      exitsToLock.push({
        directionToLock,
        oppositeExit: roomData[currentExit.exit].exits[oppositeExits[directionToLock]]
      });
    }
  }

  return exitsToLock;
}
