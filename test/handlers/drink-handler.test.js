'use strict';

import drinkHandler from '../../app/handlers/drink-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {quietlyAddItem, dropItem} from '../../app/actions/inventory-actions.js';
import {itemData} from '../../app/data/items.js';

describe('drinkHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  describe('With no args', () => {
    it('should return an error object with feedback of "Drink what?"', () => {
      expect(drinkHandler('drink')).toEqual({...returnObj, feedback: 'Drink what?'});
    });
  });
});
