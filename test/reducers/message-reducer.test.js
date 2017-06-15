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
    it('should return the current state, with the messages array updated with the payload', () => {
      expect(reducer(undefined, {type: 'NEW_MESSAGE', payload: 'New message'})).toEqual({
        ...initialState,
        messages: ['New message']
      });
    });
  });

  describe('With an UPDATE_INPUT action', () => {
    it('should return the current state, with the input updated with the payload', () => {
      expect(reducer(initialState, {type: 'UPDATE_INPUT', payload: 's'})).toEqual({
        ...initialState,
        input: 's'
      });
    });
  });

  describe('With an UPDATE_COMMAND_INDEX action', () => {
    it('should return the current state, with the commandIndex updated with the payload', () => {
      expect(reducer(initialState, {type: 'UPDATE_COMMAND_INDEX', payload: 1})).toEqual({
        ...initialState,
        commandIndex: 1
      });
    });
  });
});
