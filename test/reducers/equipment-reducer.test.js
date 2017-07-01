'use strict';

import reducer, {initialState} from '../../app/reducers/equipment-reducer.js';
import newItem from '../../app/data/items.js';

describe('Equipment reducer', () => {
  it('should have an initialState of nulls', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('With type WEAR_EQUIPMENT', () => {
    it('should update the appropriate wear slot with the item equipped', () => {
      let helm = newItem('leather helm', 'equipment');
      expect(reducer(initialState, {type: 'WEAR_EQUIPMENT', payload: {equipment: helm}})).toEqual({
        ...initialState,
        head: helm
      });
    });
  });
});
