'use strict';

import communicationHandler from '../../app/handlers/communication-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('communicationHandler', () => {
  let props = {username: 'tester'};
  let returnObj = {funcsToCall: [newMessage]};

  describe('Say', () => {
    it('should return an error object if no args are given', () => {
      expect(communicationHandler('say')).toEqual({...returnObj, feedback: 'Say what?'});
    });

    it('should return a say object with args', () => {
      expect(communicationHandler('say', 'hello', null, props)).toEqual({
        ...returnObj,
        from: props.username,
        text: 'hello',
        emitType: 'say',
        commType: ' say, '
      });
    });
  });

  describe('Whisper', () => {
    it('should return an error object if no target or message is given', () => {
      expect(communicationHandler('whisper', 'hello')).toEqual({...returnObj, feedback: 'Whisper what to whom? (format: whisper <target> <message>)'});
    });

    it('should also return an error object if no args are given', () => {
      expect(communicationHandler('whisper')).toEqual({...returnObj, feedback: 'Whisper what to whom? (format: whisper <target> <message>)'});
    });
  });
});
