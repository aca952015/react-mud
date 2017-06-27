'use strict';

import giveHandler from '../../app/handlers/give-handler.js';
import newItem from '../../app/data/items.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('giveHandler', () => {
  let defaultObj = {funcsToCall: [newMessage]};
  describe('Without the correct number of arguments', () => {
    it('should return a feedback error of "give what to whom"', () => {
      expect(giveHandler('give', 'potion', null, {inventory: newItem('health potion')})).toEqual({
        ...defaultObj,
        feedback: 'Give what to whom? (format: GIVE <item> <target>)'
      });
    });
  });
});
