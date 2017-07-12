'use strict';

import reducer from '../../app/reducers/equipment-reducer.js';
import {initialState} from '../../app/data/equipment-initial-state.js';
import newItem from '../../app/data/items.js';

describe('Equipment reducer', () => {
  it('should have an initialState of an empty object', () => {
    expect(reducer(undefined, {})).toEqual({});
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

  describe('With type LOGIN_EQUIPMENT', () => {
    it('should update the whole state to the payload', () => {
      expect(reducer(initialState, {type: 'LOGIN_EQUIPMENT', payload: 'All of it'})).toEqual('All of it');
    });
  });

  describe('With type REMOVE_ITEM', () => {
    it('should update the appropriate wear slot to null', () => {
      let helm = newItem('equipment', 'leather helm');
      expect(reducer({...initialState, head: helm}, {type: 'REMOVE_ITEM', payload: helm})).toEqual(initialState);
    });
  });
});
