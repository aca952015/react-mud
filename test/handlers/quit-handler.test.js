'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import quitHandler from '../../app/handlers/quit-handler.js';

describe('quitHandler', () => {
  describe('If the user is in combat', () => {
    it('should return an error feedback object', () => {
      expect(quitHandler('quit', undefined, {combat: {active: true}})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You can\'t quit while you\'re in combat!'
      });
    });
  });
});
