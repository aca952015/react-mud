'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import examineHandler from '../../app/handlers/examine-handler.js';
import {itemData} from '../../app/data/items.js';

describe('examineHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [itemData['health potion'], itemData['gallows key'], itemData['health potion']]
  };

  describe('With no args', () => {
    it('should return an error object with the feedback "Examine what?"', () => {
      expect(examineHandler('examine')).toEqual({...returnObj, feedback: 'Examine what?'});
    });
  });
});
