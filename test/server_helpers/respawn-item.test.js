'use strict';

import respawnItems from '../../lib/respawn-items.js';
import {roomData} from '../../app/data/rooms.js';
import newItem from '../../app/data/items.js';

describe('respawnItems', () => {
  const roomReset = JSON.parse(JSON.stringify(roomData));
  const TEST_ROOM = 'Test - Nexus';
  const alteredRooms = [];

  describe('With a room not missing any items or mobs and no exits needing to be relocked', () => {
    it('should maintain resetTimers of 0 and have the same item array as started', () => {
      roomData[TEST_ROOM] = JSON.parse(JSON.stringify(roomReset[TEST_ROOM]));
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData[TEST_ROOM].itemResetTimer).toEqual(0);
      expect(roomData[TEST_ROOM].items).toEqual(roomReset[TEST_ROOM].items);
      expect(roomData[TEST_ROOM].mobResetTimer).toEqual(0);
      expect(roomData[TEST_ROOM].mobs).toEqual(roomReset[TEST_ROOM].mobs);
      expect(roomData[TEST_ROOM].exits).toEqual(roomReset[TEST_ROOM].exits);
      expect(roomData[TEST_ROOM].lockedExitTimer).toEqual(0);
    });
  });

  describe('With a room missing some items and mobs and an exit needing to be locked', () => {
    describe('The first tick it\'s missing', () => {
      it('should increase resetTimer to 1, but leave the items and exits the same', () => {
        roomData[TEST_ROOM] = JSON.parse(JSON.stringify(roomReset[TEST_ROOM]));
        roomData[TEST_ROOM].items.splice(0, 1);
        roomData[TEST_ROOM].mobs.splice(0, 1);
        roomData[TEST_ROOM].exits.up.locked = false;
        roomData['Test - Secret Room'].exits.down.locked = false;
        alteredRooms.push(TEST_ROOM);
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData[TEST_ROOM].itemResetTimer).toEqual(1);
        expect(roomData[TEST_ROOM].mobResetTimer).toEqual(1);
        expect(roomData[TEST_ROOM].lockedExitTimer).toEqual(1);
        expect(roomData[TEST_ROOM].items).toEqual(roomReset[TEST_ROOM].items.slice(1));
        expect(roomData[TEST_ROOM].mobs).toEqual(roomReset[TEST_ROOM].mobs.slice(1));
      });
    });

    describe('When the timer has gone over 3 with missing items and mobs and an unlocked exit', () => {
      it('should respawn any missing items and set the resetTimer back to 0', () => {
        roomData[TEST_ROOM].itemResetTimer = 3;
        roomData[TEST_ROOM].mobResetTimer = 3;
        roomData[TEST_ROOM].lockedExitTimer = 3;
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData[TEST_ROOM].items[roomData[TEST_ROOM].items.length - 1].name).toEqual('corpse');
        expect(roomData[TEST_ROOM].items[roomData[TEST_ROOM].items.length - 1].short).toEqual('a corpse');
        expect(roomData[TEST_ROOM].itemResetTimer).toEqual(0);
        expect(roomData[TEST_ROOM].mobs[roomData[TEST_ROOM].mobs.length - 1].name).toEqual('bat');
        expect(roomData[TEST_ROOM].mobs[roomData[TEST_ROOM].mobs.length - 1].short).toEqual('a small bat');
        expect(roomData[TEST_ROOM].mobResetTimer).toEqual(0);
        expect(roomData[TEST_ROOM].lockedExitTimer).toEqual(0);
        expect(roomData[TEST_ROOM].exits.up.locked).toEqual(true);
        expect(roomData['Test - Secret Room'].exits.down.locked).toEqual(true);
        expect(alteredRooms.length).toEqual(0);
      });
    });
  });

  describe('With a room missing items, but not mobs', () => {
    describe('That aren\'t containers', () => {
      it('should not enter into the mobsToRespawn logic', () => {
        roomData[TEST_ROOM].items = roomReset[TEST_ROOM].items.concat();
        roomData[TEST_ROOM].items.splice(0, 1);
        roomData[TEST_ROOM].mobs = roomReset[TEST_ROOM].mobs.concat();
        alteredRooms.push(TEST_ROOM);
        respawnItems(roomData, roomReset, alteredRooms);
        expect(roomData[TEST_ROOM].itemResetTimer).toEqual(1);
        expect(roomData[TEST_ROOM].mobResetTimer).toEqual(0);
      });
    });

    describe('That are containers', () => {
      describe('With a resetTimer of 3', () => {
        it('should respawn the containers', () => {
          const backpackWithPotion = newItem('containers', 'backpack');
          const backpackWithKey = newItem('containers', 'backpack');
          const emptyBackpack = newItem('containers', 'backpack');
          const testRoom = JSON.parse(JSON.stringify(roomReset));
          roomData[TEST_ROOM].items = [emptyBackpack];
          roomData[TEST_ROOM].itemResetTimer = 3;
          testRoom[TEST_ROOM].items = [backpackWithPotion, backpackWithKey];
          backpackWithPotion.container.contains.push(newItem('potions', 'health potion'));
          backpackWithKey.container.contains.push(newItem('keys', 'academy key'));
          alteredRooms.push(TEST_ROOM);

          respawnItems(roomData, testRoom, alteredRooms);
          expect(roomData[TEST_ROOM].itemResetTimer).toEqual(0);
          expect(roomData[TEST_ROOM].items[0].category).toEqual('containers');
          expect(roomData[TEST_ROOM].items[0].name).toEqual('backpack');
          expect(roomData[TEST_ROOM].items[0].container.contains[0].name).toEqual('health potion');
          expect(roomData[TEST_ROOM].items[1].container.contains[0].name).toEqual('academy key');
        });
      });
    });

    describe('With a room of no containers', () => {
      describe('With a resetTimer of 3', () => {
        const helm = newItem('equipment', 'leather helm');
        const testRoom = JSON.parse(JSON.stringify(roomReset));
        roomData[TEST_ROOM].items = [];
        testRoom[TEST_ROOM].items = [helm];
        roomData[TEST_ROOM].itemResetTimer = 3;
        alteredRooms.push(TEST_ROOM);

        respawnItems(roomData, testRoom, alteredRooms);
        expect(roomData[TEST_ROOM].itemResetTimer).toEqual(0);
        expect(roomData[TEST_ROOM].items[0].name).toEqual('leather helm');
      });
    });
  });

  describe('With a room missing mobs, but not items', () => {
    it('should not enter into the itemsToRespawn logic', () => {
      roomData[TEST_ROOM].itemResetTimer = 0;
      roomData[TEST_ROOM].items = roomReset[TEST_ROOM].items.concat();
      roomData[TEST_ROOM].mobs.splice(0, 1);
      respawnItems(roomData, roomReset, alteredRooms);
      expect(roomData[TEST_ROOM].itemResetTimer).toEqual(0);
      expect(roomData[TEST_ROOM].mobResetTimer).toEqual(1);
    });
  });
});
