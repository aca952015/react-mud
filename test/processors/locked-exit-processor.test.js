'use strict';

import lockedExitProcessor from '../../app/processors/locked-exit-processor.js';
import {roomData} from '../../app/data/rooms.js';
import {itemData} from '../../app/data/items.js';

describe('lockedExitProcessor', () => {
  const TEST_ROOM = 'Test - Nexus';
  
  describe('With an exit that wasn\'t locked and needs to be locked', () => {
    it('should lock both sides of the exit', () => {
      roomData[TEST_ROOM].exits.up.locked = false;
      roomData['Test - Secret Room'].exits.down.locked = false;
      const exitsToLock = lockedExitProcessor(roomData[TEST_ROOM].exits);

      expect(exitsToLock[0].directionToLock).toEqual('up');
      expect(exitsToLock[0].oppositeExit).toEqual({
        exit: TEST_ROOM,
        locked: false,
        requiredKey: itemData['keys']['secret key']
      });
    });
  });
});
