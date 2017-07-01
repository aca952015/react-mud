'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {wearEquipment} from '../../app/actions/item-actions.js';
import wearHandler from '../../app/handlers/wear-handler.js';

describe('wearHandler', () => {
  const defaultObj = {funcsToCall: [newMessage]};
  describe('With no args', () => {
    it('should return feedback of "Wear what?"', () => {
      expect(wearHandler('wear')).toEqual({
        ...defaultObj,
        feedback: 'Wear what?'
      });
    });
  });
});
