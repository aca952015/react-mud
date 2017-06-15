'use strict';

import {helpFile} from '../../app/data/help-files.js';
import {newMessage} from '../../app/actions/message-actions.js';
import helpHandler from '../../app/handlers/help-handler.js';

describe('helpHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  describe('Without args', () => {
    it('should return the helpObj with the overall help file', () => {
      expect(helpHandler('help')).toEqual({
        ...returnObj,
        helpObj: helpFile['help'],
        feedback: ''
      });
    });
  });
});
