'use strict';

import itemPickUpProcessor from '../../app/processors/item-pickup-processor.js';
import newItem from '../../app/data/items.js';

describe('itemPickUpProcessor', () => {
  let room = {
    room: {
      from: 'TestR',
      pickRoom: 'Nexus',
      roomItems: [newItem('health potion'), newItem('gallows key')],
      item: room.roomItems[0]
    }
  };
  describe('The user is not in the same room', () => {
    it('should return an empty object', () => {
      expect(itemPickUpProcessor(room, {currentRoom: 'Gallows'})).toEqual({});
    });
  });

  describe('The user is in the same room', () => {
    it('should return a pick object to be processed by the newMessage action', () => {
      expect(itemPickUpProcessor(room, {currentRoom: 'Nexus'})).toEqual({
        from: room.from,
        feedback: ` picks up ${room.room.item.short}.`
      });
    });
  });
});
