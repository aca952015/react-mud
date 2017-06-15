'use strict';

import itemPickUpProcessor from '../../app/processors/item-pickup-processor.js';
import {itemData} from '../../app/data/items.js';

describe('itemPickUpProcessor', () => {
  let room = {
    room: {
      from: 'TestR',
      pickRoom: 'Nexus',
      roomItems: [itemData['health potion'], itemData['gallows key']],
      item: itemData['health potion']
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
