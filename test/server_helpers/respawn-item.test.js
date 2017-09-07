'use strict';

import respawnItems from '../../lib/respawn-items.js';
import {roomData} from '../../app/data/rooms.js';
import newItem from '../../app/data/items.js';

describe('respawnItems', () => {
  const roomReset = JSON.parse(JSON.stringify(roomData));
  const alteredRooms = [];

  describe('With a room not missing any items or mobs and no exits needing to be relocked', () => {
    it('should maintain resetTimers of 0 and have the same item array as started', () => {
      roomData['Test - Nexus'] = JSON.parse(JSON.stringify(roomReset['Test - Nexus']));
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
      expect(roomData['Test - Nexus'].items).toEqual(roomReset['Test - Nexus'].items);
      expect(roomData['Test - Nexus'].mobResetTimer).toEqual(0);
      expect(roomData['Test - Nexus'].mobs).toEqual(roomReset['Test - Nexus'].mobs);
      expect(roomData['Test - Nexus'].exits).toEqual(roomReset['Test - Nexus'].exits);
      expect(roomData['Test - Nexus'].lockedExitTimer).toEqual(0);
    });
  });

  describe('With a room missing some items and mobs and an exit needing to be locked', () => {
    describe('The first tick it\'s missing', () => {
      it('should increase resetTimer to 1, but leave the items and exits the same', () => {
        roomData['Test - Nexus'] = JSON.parse(JSON.stringify(roomReset['Test - Nexus']));
        roomData['Test - Nexus'].items.splice(0, 1);
        roomData['Test - Nexus'].mobs.splice(0, 1);
        roomData['Test - Nexus'].exits.up.locked = false;
        roomData['Test - Secret Room'].exits.down.locked = false;
        alteredRooms.push('Test - Nexus');
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData['Test - Nexus'].itemResetTimer).toEqual(1);
        expect(roomData['Test - Nexus'].mobResetTimer).toEqual(1);
        expect(roomData['Test - Nexus'].lockedExitTimer).toEqual(1);
        expect(roomData['Test - Nexus'].items).toEqual(roomReset['Test - Nexus'].items.slice(1));
        expect(roomData['Test - Nexus'].mobs).toEqual(roomReset['Test - Nexus'].mobs.slice(1));
      });
    });

    describe('When the timer has gone over 3 with missing items and mobs and an unlocked exit', () => {
      it('should respawn any missing items and set the resetTimer back to 0', () => {
        roomData['Test - Nexus'].itemResetTimer = 3;
        roomData['Test - Nexus'].mobResetTimer = 3;
        roomData['Test - Nexus'].lockedExitTimer = 3;
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData['Test - Nexus'].items[roomData['Test - Nexus'].items.length - 1].name).toEqual('corpse');
        expect(roomData['Test - Nexus'].items[roomData['Test - Nexus'].items.length - 1].short).toEqual('a corpse');
        expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
        expect(roomData['Test - Nexus'].mobs[roomData['Test - Nexus'].mobs.length - 1].name).toEqual('bat');
        expect(roomData['Test - Nexus'].mobs[roomData['Test - Nexus'].mobs.length - 1].short).toEqual('a small bat');
        expect(roomData['Test - Nexus'].mobResetTimer).toEqual(0);
        expect(roomData['Test - Nexus'].lockedExitTimer).toEqual(0);
        expect(roomData['Test - Nexus'].exits.up.locked).toEqual(true);
        expect(roomData['Test - Secret Room'].exits.down.locked).toEqual(true);
        expect(alteredRooms.length).toEqual(0);
      });
    });
  });

  describe('With a room missing items, but not mobs', () => {
    describe('That aren\'t containers', () => {
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

    describe('That are containers', () => {
      describe('With a resetTimer of 3', () => {
        it('should respawn the containers', () => {
          const backpackWithPotion = newItem('containers', 'backpack');
          const backpackWithKey = newItem('containers', 'backpack');
          const emptyBackpack = newItem('containers', 'backpack');
          const testRoom = JSON.parse(JSON.stringify(roomReset));
          roomData['Test - Nexus'].items = [emptyBackpack];
          roomData['Test - Nexus'].itemResetTimer = 3;
          testRoom['Test - Nexus'].items = [backpackWithPotion, backpackWithKey];
          backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
          backpackWithKey.container.contains.push(newItem('keys', 'academy key'));
          alteredRooms.push('Test - Nexus');

          respawnItems(roomData, testRoom, alteredRooms);
          expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
          expect(roomData['Test - Nexus'].items[0].category).toEqual('containers');
          expect(roomData['Test - Nexus'].items[0].name).toEqual('backpack');
          expect(roomData['Test - Nexus'].items[0].container.contains[0].name).toEqual('health potion');
          expect(roomData['Test - Nexus'].items[1].container.contains[0].name).toEqual('academy key');
        });
      });
    });

    describe('With a room of no containers', () => {
      describe('With a resetTimer of 3', () => {
        const helm = newItem('equipment', 'leather helm');
        const testRoom = JSON.parse(JSON.stringify(roomReset));
        roomData['Test - Nexus'].items = [];
        testRoom['Test - Nexus'].items = [helm];
        roomData['Test - Nexus'].itemResetTimer = 3;
        alteredRooms.push('Test - Nexus');

        respawnItems(roomData, testRoom, alteredRooms);
        expect(roomData['Test - Nexus'].itemResetTimer).toEqual(0);
        expect(roomData['Test - Nexus'].items[0].name).toEqual('leather helm');
      });
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
