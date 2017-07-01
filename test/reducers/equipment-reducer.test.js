'use strict';

import reducer from '../../app/reducers/equipment-reducer.js';
import {initialState} from '../../app/reducers/equipment-reducer.js';

describe('Equipment reducer', () => {
  it('should have an initialState of nulls', () => {
    expect(reducer(undefined, undefined)).toEqual(initialState);
  });
});
