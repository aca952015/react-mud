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
      expect(communicationHandler('say', 'hello', {...props, effects: {death: false}})).toEqual({
        ...returnObj,
        from: props.username,
        text: 'hello',
        emitType: 'say',
        commType: ' say, '
      });
    });

    it('should return a ghost from say object with args if the user is dead', () => {
      expect(communicationHandler('say', 'hello', {...props, effects: {death: true}})).toEqual({
        ...returnObj,
        from: `The ghost of ${props.username}`,
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

    it('should return a whisper object with correct args', () => {
      expect(communicationHandler('whisper', 'duder hello', props)).toEqual({
        target: 'duder',
        text: 'hello',
        from: props.username,
        emitType: 'whisper'
      });
    });
  });

  describe('Unknown error', () => {
    it('should return an unknown error object', () => {
      expect(communicationHandler('wat')).toEqual({...returnObj, feedback: 'Unknown error occurred. Try entering your command again.'});
    });
  });
});
