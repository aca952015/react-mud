'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import getHandler from '../../app/handlers/get-handler.js';

describe('getHandler', () => {
  describe('With no args', () => {
    it('should return an error object with feedback "Get what?"', () => {
      expect(getHandler('get')).toEqual({funcsToCall: [newMessage], feedback: 'Get what?'});
    });
  });
});
