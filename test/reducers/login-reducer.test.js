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

  describe('With action of SET_USERNAME', () => {
    it('should update the newUsername of state with the payload', () => {
      expect(reducer(initialState, {type: 'SET_USERNAME', payload: 'Dave'})).toEqual({
        ...initialState,
        newUsername: 'Dave'
      });
    });
  });

  describe('With action of SET_FIRST_PASSWORD', () => {
    it('should update the firstPassword of state with the payload', () => {
      expect(reducer(initialState, {type: 'SET_FIRST_PASSWORD', payload: 'banana'})).toEqual({
        ...initialState,
        firstPassword: 'banana'
      });
    });
  });
});
