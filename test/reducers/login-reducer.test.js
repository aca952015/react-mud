'use strict';

import reducer, {initialState} from '../../app/reducers/login-reducer.js';

describe('login reducer', () => {
  describe('With no action', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
  
  describe('With action of NEW_CHARACTER', () => {
    it('should change creatingNew to true', () => {
      expect(reducer(initialState, {type: 'NEW_CHARACTER'})).toEqual({
        ...initialState,
        creatingNew: true
      });
    });
  });
});
