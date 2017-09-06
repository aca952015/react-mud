'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';

describe('item respawn processor', () => {
  const originalRoom = [newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
  const currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm')];
  const backpackWithPotion = {
    ...newItem('containers', 'backpack'),
    container: {
      holds: ['items', 'weapons', 'equipment'],
      contains: [newItem('potions', 'health potion')]
    }
  };
  const backpackWithKey = {
    ...newItem('containers', 'backpack'),
    container: {
      holds: ['items', 'weapons', 'equipment'],
      contains: [newItem('keys', 'academy key')]
    }
  };
  const backpackWithSword = {
    ...newItem('containers', 'backpack'),
    container: {
      holds: ['items', 'weapons', 'equipment'],
      contains: [newItem('weapons', 'broad sword')]
    }
  };

  describe('With a room that isn\'t missing any items', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalRoom, currentRoom)).toEqual({itemsToRespawn: [], itemsToRemove: []});
    });
  });

  describe('With a room that has extra items', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalRoom, [...currentRoom, newItem('potions', 'health potion')])).toEqual({
        itemsToRespawn: [],
        itemsToRemove: []
      });
    });
  });

  describe('With a room missing all of an original item', () => {
    describe('That aren\'t containers', () => {
      it('should respawn the correct number of items', () => {
        expect(itemRespawnProcessor(originalRoom, [newItem('keys', 'gallows key')])).toEqual({
          itemsToRespawn: [
            {
              category: 'equipment',
              name: 'leather helm'
            },
            {
              category: 'equipment',
              name: 'leather helm'
            }
          ],
          itemsToRemove: []
        });
      });
    });

    describe('With containers', () => {
      describe('With three containing the same item', () => {
        const roomItems = [backpackWithPotion, backpackWithPotion, backpackWithPotion];
        const currentItems = [];
        expect(itemRespawnProcessor(roomItems, currentItems)).toEqual({
          itemsToRespawn: [
            {
              category: backpackWithPotion.category,
              respawnContents: [backpackWithPotion.container.contains[0]],
              name: backpackWithPotion.name
            },
            {
              category: backpackWithPotion.category,
              respawnContents: [backpackWithPotion.container.contains[0]],
              name: backpackWithPotion.name
            },
            {
              category: backpackWithPotion.category,
              respawnContents: [backpackWithPotion.container.contains[0]],
              name: backpackWithPotion.name
            }
          ],
          itemsToRemove: []
        });
      });
    });
  });

  describe('With a room missing only some of the original items', () => {
    it('should respawn the correct number of items', () => {
      expect(itemRespawnProcessor(originalRoom, [newItem('equipment', 'leather helm')])).toEqual({
        itemsToRespawn: [
          {
            category: 'equipment',
            name: 'leather helm'
          },
          {
            category: 'keys',
            name: 'gallows key'
          }
        ],
        itemsToRemove: []
      });
    });
  });
});
