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

  describe('With a room missing something', () => {
    describe('The first tick it\'s missing', () => {
      it('should increase resetTimer to 1, but leave the items the same', () => {
        roomData['Nexus'].items.splice(0, 1);
        respawnItems(roomData, roomReset);
        expect(roomData['Nexus'].resetTimer).toEqual(1);
        expect(roomData['Nexus'].items).toEqual(roomReset['Nexus'].items.slice(1));
      });
    });

    describe('When the timer has gone over 3', () => {
      it('should respawn any missing items and set the resetTimer back to 0', () => {
        roomData['Nexus'].resetTimer = 3;
        respawnItems(roomData, roomReset);
        expect(roomData['Nexus'].items[roomData['Nexus'].items.length - 1].name).toEqual('corpse');
        expect(roomData['Nexus'].items[roomData['Nexus'].items.length - 1].short).toEqual('a corpse');
        expect(roomData['Nexus'].resetTimer).toEqual(0);
      });
    });
  });
});
