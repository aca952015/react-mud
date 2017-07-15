'use strict';

import reducer from '../../app/reducers/skill-reducer.js';

describe('skills reducer', () => {
  it('should have an initialState of an empty object', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
});
