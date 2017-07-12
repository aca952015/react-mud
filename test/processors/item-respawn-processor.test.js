'use strict';

import itemRespawnProcessor from '../../app/processors/item-respawn-processor.js';
import newItem from '../../app/data/items.js';
import newMob from '../../app/data/mobs.js';

describe('item respawn processor', () => {
  let originalRoom = [newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm'), newItem('keys', 'gallows key')];
  let currentRoom = [newItem('keys', 'gallows key'), newItem('equipment', 'leather helm'), newItem('equipment', 'leather helm')];
  let originalMobs = [newMob('bat'), newMob('bat'), newMob('armored zombie')];
  let currentMobs = [newMob('bat'), newMob('bat'), newMob('armored zombie')];

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

  describe('With a room missing all of an original item', () => {
    it('should respawn the correct number of items', () => {
      expect(itemRespawnProcessor(originalRoom, [newItem('keys', 'gallows key')])).toEqual([
        {
          category: 'equipment',
          name: 'leather helm'
        },
        {
          category: 'equipment',
          name: 'leather helm'
        }
      ]);
    });
  });

  describe('With a room missing only some of the original items', () => {
    it('should respawn the correct number of items', () => {
      expect(itemRespawnProcessor(originalRoom, [newItem('equipment', 'leather helm')])).toEqual([
        {
          category: 'equipment',
          name: 'leather helm'
        },
        {
          category: 'keys',
          name: 'gallows key'
        }
      ]);
    });
  });

  describe('With a room not missing any mobs', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalMobs, currentMobs)).toEqual([]);
    });
  });

  describe('With a room that has extra mobs', () => {
    it('should return an empty array', () => {
      expect(itemRespawnProcessor(originalMobs, [...currentMobs, newMob('bat')])).toEqual([]);
    });
  });

  describe('With a room missing all of one type of mob', () => {
    it('should respawn the correct number of items', () => {
      expect(itemRespawnProcessor(originalMobs, [newMob('armored zombie')])).toEqual([
        {name: 'bat'},
        {name: 'bat'}
      ]);
    });
  });

  describe('With a room missing only some of a type of a mob', () => {
    it('should respawn the correct number of mobs', () => {
      expect(itemRespawnProcessor(originalMobs, [newMob('bat')])).toEqual([
        {name: 'bat'},
        {name: 'armored zombie'}
      ]);
    });
  });
});
