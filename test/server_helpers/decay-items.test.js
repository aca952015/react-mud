'use strict';

import newItem from '../../app/data/items.js';
import decayItems from '../../lib/decay-items.js';

describe('decayItems', () => {
  const TEST_ROOM = 'test room';
  const io = {
    sockets: {
      to: () => ({emit: () => {}})
    }
  };

  describe('With no decayable items', () => {
    it('should not change the room', () => {
      const testRooms = {};
      testRooms[TEST_ROOM] = {
        items: [newItem('potions', 'health potion'), newItem('equipment', 'leather helm')]
      };

      decayItems(testRooms, io);
      expect(testRooms[TEST_ROOM].items.length).toEqual(2);
    });
  });

  describe('With a decayable item', () => {
    describe('With a decayTimer of 1 or less', () => {
      describe('That\'s a container', () => {
        it('should drop the container\'s contents into the room, then decay the container', () => {
          const corpseWithPotion = newItem('containers', 'corpse');
          corpseWithPotion.container.contains.push(newItem('potions', 'health potion'));
          corpseWithPotion.decayTimer = 1;

          const testRooms = {};
          testRooms[TEST_ROOM] = {
            items: [corpseWithPotion, newItem('equipment', 'leather helm')]
          };

          decayItems(testRooms, io);
          expect(testRooms[TEST_ROOM].items.length).toEqual(2);
          expect(testRooms[TEST_ROOM].items[1].id).toEqual(corpseWithPotion.container.contains[0].id);
          expect(testRooms[TEST_ROOM].items.find(item => corpseWithPotion.id === item.id)).toEqual(undefined);
        });
      });

      describe('That isn\'t a container', () => {
        it('should remove the item from the room', () => {
          const editedHelm = newItem('equipment', 'leather helm');
          editedHelm.decaying = true;
          editedHelm.decayTimer = 1;

          const testRooms = {};
          testRooms[TEST_ROOM] = {
            items: [editedHelm]
          };

          decayItems(testRooms, io);
          expect(testRooms[TEST_ROOM].items.length).toEqual(0);
        });
      });
    });

    describe('With a decayTimer of 2 or more', () => {
      it('should not change the room', () => {
        const corpseWithPotion = newItem('containers', 'corpse');
        corpseWithPotion.container.contains.push(newItem('potions', 'health potion'));

        const testRooms = {};
        testRooms[TEST_ROOM] = {
          items: [corpseWithPotion, newItem('equipment', 'leather helm')]
        };

        decayItems(testRooms, io);
        expect(testRooms[TEST_ROOM].items.length).toEqual(2);
        expect(testRooms[TEST_ROOM].items[0].id).toEqual(corpseWithPotion.id);
        expect(testRooms[TEST_ROOM].items.find(item => corpseWithPotion.container.contains[0].id === item.id)).toEqual(undefined);
      });
    });
  });
});
