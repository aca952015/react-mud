'use strict';

import {restoreStat, wearEquipment, removeItem} from '../../app/actions/item-actions.js';

describe('item actions', () => {
  describe('restoreStat', () => {
    it('should return an object with type "DRINK_POTION" and a payload with an item\'s statToChange and amount', () => {
      let item = {
        statToChange: 'hp',
        amount: 10
      };
      expect(restoreStat(item)).toEqual({
        type: 'DRINK_POTION',
        payload: {
          statToChange: item.statToChange,
          amount: item.amount
        }
      });
    });
  });

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
