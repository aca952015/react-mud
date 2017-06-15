'use strict';

import {getItem, dropItem, quietlyAddItem} from '../../app/actions/inventory-actions.js';

describe('inventory actions', () => {
  describe('getItem', () => {
    it('should return an object with type GET_ITEM and payload of the item passed in', () => {
      expect(getItem({someItem: 'yep'})).toEqual({type: 'GET_ITEM', payload: {someItem: 'yep'}});
    });
  });
});
