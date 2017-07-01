'use strict';

import {restoreStat, wearEquipment} from '../../app/actions/item-actions.js';

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
    it('should return an object with type "WEAR_EQUIPMENT" and payload of whatever was passed in', () => {
      expect(wearEquipment('something')).toEqual({type: 'WEAR_EQUIPMENT', payload: 'something'});
    });
  });
});
