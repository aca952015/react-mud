'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';

describe('item respawn processor', () => {
  let originalRoom = [newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
  let currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm')];

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
