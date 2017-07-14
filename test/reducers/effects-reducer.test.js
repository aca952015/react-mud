'use strict';

import reducer from '../../app/reducers/effects-reducer.js';

describe('Effects reducer', () => {
  describe('It should return an empty object by default', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  describe('With an action of ADD_EFFECT', () => {
    it('should set that state to a boolean of true as a property on the state object', () => {
      expect(reducer({}, {type: 'ADD_EFFECT', payload: 'death'})).toEqual({death: true});
    });
  });
});
