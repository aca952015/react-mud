'use strict';

import reducer from '../../app/reducers/message-reducer.js';

describe('message reducer', () => {
  it('should return an initialState with nothing passed in', () => {
    expect(reducer(undefined, {})).toEqual({
      messages: [],
      input: '',
      prevCommands: [],
      commandIndex: 0
    });
  });
});
