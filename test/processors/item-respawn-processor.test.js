'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';

describe('item respawn processor', () => {
  let originalRoom = [newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
  let currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm')];

  describe('With a room that isn\'t missing any items', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalRoom, currentRoom)).toEqual([]);
    });
  });

  describe('With a room that has extra items', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalRoom, [...currentRoom, newItem('potions', 'health potion')])).toEqual([]);
    });
  });
});
