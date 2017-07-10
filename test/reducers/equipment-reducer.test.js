'use strict';

import reducer, {initialState} from '../lib/equipment-initial-state.js';
import newItem from '../../app/data/items.js';

describe('Equipment reducer', () => {
  it('should have an initialState of nulls', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('With type WEAR_EQUIPMENT', () => {
    it('should update the appropriate wear slot with the item equipped', () => {
      let helm = newItem('equipment', 'leather helm');
      expect(reducer(initialState, {type: 'WEAR_EQUIPMENT', payload: helm})).toEqual({
        ...initialState,
        head: helm
      });
    });
  });

  describe('With type REMOVE_ITEM', () => {
    it('should update the appropriate wear slot to null', () => {
      let helm = newItem('equipment', 'leather helm');
      expect(reducer({...initialState, head: helm}, {type: 'REMOVE_ITEM', payload: helm})).toEqual(initialState);
    });
  });
});
