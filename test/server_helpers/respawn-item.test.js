'use strict';

import respawnItems from '../../lib/respawn-items.js';
import {roomData} from '../../app/data/rooms.js';

describe('respawnItems', () => {
  const roomReset = JSON.parse(JSON.stringify(roomData));
  const alteredRooms = [];

  describe('With a room not missing any items or mobs', () => {
    it('should maintain resetTimers of 0 and have the same item array as started', () => {
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
      expect(roomData['Test - Nexus'].items).toEqual(roomReset['Test - Nexus'].items);
      expect(roomData['Test - Nexus'].mobResetTimer).toEqual(0);
      expect(roomData['Test - Nexus'].mobs).toEqual(roomReset['Test - Nexus'].mobs);
    });
  });

  describe('With a room missing some items and mobs', () => {
    describe('The first tick it\'s missing', () => {
      it('should increase resetTimer to 1, but leave the items the same', () => {
        roomData['Test - Nexus'].items.splice(0, 1);
        roomData['Test - Nexus'].mobs.splice(0, 1);
        alteredRooms.push('Test - Nexus');
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData['Test - Nexus'].itemResetTimer).toEqual(1);
        expect(roomData['Test - Nexus'].mobResetTimer).toEqual(1);
        expect(roomData['Test - Nexus'].items).toEqual(roomReset['Test - Nexus'].items.slice(1));
        expect(roomData['Test - Nexus'].mobs).toEqual(roomReset['Test - Nexus'].mobs.slice(1));
      });
    });

    describe('When the timer has gone over 3 with missing items and mobs', () => {
      it('should respawn any missing items and set the resetTimer back to 0', () => {
        roomData['Test - Nexus'].itemResetTimer = 3;
        roomData['Test - Nexus'].mobResetTimer = 3;
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData['Test - Nexus'].items[roomData['Test - Nexus'].items.length - 1].name).toEqual('corpse');
        expect(roomData['Test - Nexus'].items[roomData['Test - Nexus'].items.length - 1].short).toEqual('a corpse');
        expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
        expect(roomData['Test - Nexus'].mobs[roomData['Test - Nexus'].mobs.length - 1].name).toEqual('bat');
        expect(roomData['Test - Nexus'].mobs[roomData['Test - Nexus'].mobs.length - 1].short).toEqual('a small bat');
        expect(roomData['Test - Nexus'].mobResetTimer).toEqual(0);
        expect(alteredRooms.length).toEqual(0);
      });
    });
  });

  describe('With a room missing items, but not mobs', () => {
    it('should not enter into the mobsToRespawn logic', () => {
      roomData['Test - Nexus'].items = roomReset['Test - Nexus'].items.concat();
      roomData['Test - Nexus'].items.splice(0, 1);
      roomData['Test - Nexus'].mobs = roomReset['Test - Nexus'].mobs.concat();
      alteredRooms.push('Test - Nexus');
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData['Test - Nexus'].itemResetTimer).toEqual(1);
      expect(roomData['Test - Nexus'].mobResetTimer).toEqual(0);
    });
  });

  describe('With a room missing mobs, but not items', () => {
    it('should not enter into the itemsToRespawn logic', () => {
      roomData['Test - Nexus'].itemResetTimer = 0;
      roomData['Test - Nexus'].items = roomReset['Test - Nexus'].items.concat();
      roomData['Test - Nexus'].mobs.splice(0, 1);
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
      expect(roomData['Test - Nexus'].mobResetTimer).toEqual(1);
    });
  });
});
