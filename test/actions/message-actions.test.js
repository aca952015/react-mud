'use strict';

import {newMessage, updateInput, updateCommandIndex, updatePrevCommands, truncatePrevCommands} from '../../app/actions/message-actions.js';

describe('message actions', () => {
  describe('newMessage', () => {
    it('should return a type of NEW_MESSAGE and a payload of whatever got passed in', () => {
      expect(newMessage('Boyyyy')).toEqual({type: 'NEW_MESSAGE', payload: 'Boyyyy'});
    });
  });

  describe('updateInput', () => {
    it('should return a type of UPDATE_INPUT and a payload of whatever got passed in', () => {
      expect(updateInput('Ayy')).toEqual({type: 'UPDATE_INPUT', payload: 'Ayy'});
    });
  });

  describe('updateCommandIndex', () => {
    it('should return a type of UPDATE_COMMAND_INDEX and a payload of whatever got passed in', () => {
      expect(updateCommandIndex(1)).toEqual({type: 'UPDATE_COMMAND_INDEX', payload: 1});
    });
  });

  describe('updatePrevCommands', () => {
    it('should return a type of UPDATE_PREV_COMMANDS and a payload of whatever got passed in', () => {
      expect(updatePrevCommands('Yo')).toEqual({type: 'UPDATE_PREV_COMMANDS', payload: 'Yo'});
    });
  });
});
