'use strict';

import giveHandler from '../../app/handlers/give-handler.js';
import newItem from '../../app/data/items.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('giveHandler', () => {
  let props = {inventory: [newItem('health potion')]};

  let defaultObj = {funcsToCall: [newMessage]};
  describe('Without the correct number of arguments', () => {
    it('should return a feedback error of "give what to whom"', () => {
      expect(giveHandler('give', 'potion', null, props)).toEqual({
        ...defaultObj,
        feedback: 'Give what to whom? (format: GIVE <item> <target>)'
      });
    });
  });

  describe('An item the user isn\'t carrying', () => {
    describe('Without dot notation', () => {
      it('should return a feedback error of not seeing that item', () => {
        expect(giveHandler('give', 'bob bob', null, props)).toEqual({
          ...defaultObj,
          feedback: 'You don\'t seem to be carrying that.'
        });
      });
    });
  });
});
