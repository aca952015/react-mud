'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import lockHandler from '../../app/handlers/lock-handler.js';

describe('lockHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};

  describe('With no args and a command of unlock', () => {
    it('should return an error object with the feedback "Unlock what direction?"', () => {
      expect(lockHandler('unlock')).toEqual({
        ...returnObj,
        feedback: 'Unlock what direction?'
      });
    });
  });
});
