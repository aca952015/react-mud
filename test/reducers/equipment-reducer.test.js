'use strict';

import reducer, {initialState} from '../../app/reducers/equipment-reducer.js';

describe('Equipment reducer', () => {
  it('should have an initialState of nulls', () => {
    expect(reducer(undefined, undefined)).toEqual(initialState);
  });
});
