'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';

describe('item respawn processor', () => {
  describe('With a room that isn\'t missing any items', () => {
    it('should return an empty array', () => {
      let originalRoom = [newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
      let currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm')];
      expect(itemRespawnProcessor(originalRoom, currentRoom)).toEqual([]);
    });
  });
});
