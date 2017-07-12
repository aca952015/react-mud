'use strict';

import respawnItems from '../../lib/respawn-items.js';
import {roomData} from '../../app/data/rooms.js';

describe('respawnItems', () => {
  const roomReset = JSON.parse(JSON.stringify(roomData));

  describe('With a room not missing anything', () => {
    it('should maintain resetTimers of 0 and have the same item array as started', () => {
      respawnItems(roomData, roomReset);
      expect(roomData['Nexus'].resetTimer).toEqual(0);
      expect(roomData['Nexus'].items).toEqual(roomReset['Nexus'].items);
    });
  });
});
