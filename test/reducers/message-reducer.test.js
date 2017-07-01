'use strict';

import reducer, {initialState} from '../../app/reducers/message-reducer.js';

describe('message reducer', () => {
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

  describe('With an UPDATE_PREV_COMMANDS action', () => {
    it('should return the current state, with the prevCommands updated with the payload', () => {
      expect(reducer(initialState, {type: 'UPDATE_PREV_COMMANDS', payload: 'say Hello'})).toEqual({
        ...initialState,
        prevCommands: ['say Hello']
      });
    });
  });

  describe('With a TRUNCATE_PREV_COMMANDS action', () => {
    it('should remove the first element in the prevCommands array', () => {
      expect(reducer({...initialState, prevCommands: ['1','2','3','4','5','6','7']}, {type: 'TRUNCATE_PREV_COMMANDS'})).toEqual({
        ...initialState,
        prevCommands: ['2','3','4','5','6','7']
      });
    });
  });
});
