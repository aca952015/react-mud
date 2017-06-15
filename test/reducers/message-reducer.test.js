'use strict';

import reducer from '../../app/reducers/message-reducer.js';

describe('message reducer', () => {
  let initialState = {
    messages: [],
    input: '',
    prevCommands: [],
    commandIndex: 0
  };

  it('should return an initialState with nothing passed in', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('With a NEW_MESSAGE action', () => {
    it('should return the initial state, with the messages array updated with the payload', () => {
      expect(reducer(undefined, {type: 'NEW_MESSAGE', payload: 'New message'})).toEqual({
        ...initialState,
        messages: ['New message']
      });
    });
  });
});
