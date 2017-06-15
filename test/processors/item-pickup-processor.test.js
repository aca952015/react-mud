'use strict';

import itemPickUpProcessor from '../../app/processors/item-pickup-processor.js';
import {itemData} from '../../app/data/items.js';

describe('itemPickUpProcessor', () => {
  let room = {
    room: {
      from: 'TestR',
      pickRoom: 'Nexus',
      roomItems: [itemData['health potion'], itemData['gallows key']]
    }
  };
  describe('The user is not in the same room', () => {
    it('should return an empty object', () => {
      expect(itemPickUpProcessor(room, {currentRoom: 'Gallows'})).toEqual({});
    });
  });
});
