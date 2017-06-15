'use strict';

import communicationHandler from '../../app/handlers/communication-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('communicationHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  describe('Say', () => {
    it('should return an error object if no args are given', () => {
      expect(communicationHandler('say')).toEqual({...returnObj, feedback: 'Say what?'});
    });
  });
});
