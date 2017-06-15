'use strict';

import {getItem, dropItem, quietlyAddItem} from '../../app/actions/inventory-actions.js';

describe('inventory actions', () => {
  describe('getItem', () => {
    it('should return an object with type GET_ITEM and payload of the item passed in', () => {
      expect(getItem({someItem: 'yep'})).toEqual({type: 'GET_ITEM', payload: {someItem: 'yep'}});
    });
  });

  describe('dropItem', () => {
    it('should return an object with type DROP_ITEM and payload of the item property', () => {
      expect(dropItem({item: 'yep'})).toEqual({type: 'DROP_ITEM', payload: 'yep'});
    });
  });

  describe('quietlyAddItem', () => {
    it('should return an object with type QUIETLY_ADD_ITEM and payload of the quietAdd property', () => {
      expect(quietlyAddItem({item: 'dude', quietAdd: 'ayyy'})).toEqual({type: 'QUIETLY_ADD_ITEM', payload: 'ayyy'});
    });
  });
});
