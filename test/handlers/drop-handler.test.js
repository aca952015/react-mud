'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {dropItem} from '../../app/actions/inventory-actions.js';
import dropHandler from '../../app/handlers/drop-handler.js';

describe('dropHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};

  describe('With no args', () => {
    it('should return an error object with the feedback "Drop what?"', () => {
      expect(dropHandler('drop')).toEqual({...returnObj, feedback: 'Drop what?'});
    });
  });
});
