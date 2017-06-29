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

  describe('With no args and a command of lock', () => {
    it('should return an error object with the feedback "Lock what direction?"', () => {
      expect(lockHandler('lock')).toEqual({
        ...returnObj,
        feedback: 'Lock what direction?'
      });
    });
  });

  describe('With args', () => {
    it('should return a lock emit object to be handled by the server', () => {
      expect(lockHandler('unlock', 'eAsT', null, {inventory: []})).toEqual({
        emitType: 'lock',
        inventory: [],
        direction: 'east'
      });
    });
  });
});
