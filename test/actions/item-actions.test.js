'use strict';

import {wearEquipment, removeItem} from '../../app/actions/item-actions.js';

describe('item actions', () => {
  describe('wearEquipment', () => {
    it('should return an object with type "WEAR_EQUIPMENT" and payload of the equip property of whatever was passed in', () => {
      expect(wearEquipment({equip: 'something'})).toEqual({type: 'WEAR_EQUIPMENT', payload: 'something'});
    });
  });

  describe('removeItem', () => {
    it('should return an object with type "REMOVE_ITEM" and payload of whatever was passed in', () => {
      expect(removeItem({removeEquip: 'something'})).toEqual({type: 'REMOVE_ITEM', payload: 'something'});
    });
  });
});
