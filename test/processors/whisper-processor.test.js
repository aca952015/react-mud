'use strict';

import whisperProcessor from '../../app/processors/whisper-processor.js';

describe('whisperProcessor', () => {
  describe('If the whisperer is the user and they\'re whispering another user', () => {
    it('should return a whisper object with the appropriate fields', () => {
      let result = {
        from: 'TestR',
        target: 'tester',
        text: 'Ayy'
      };
      expect(whisperProcessor(result, {username: 'TestR'})).toEqual({
        text: result.text,
        from: 'You ',
        target: result.target,
        commType: 'whisper to '
      });
    });
  });

  describe('If the whisperer is the user and they\'re whispering to themself', () => {
    it('should return a whisper object with the appropriate fields', () => {
      let result = {
        from :'TestR',
        target: 'TestR',
        text: 'Ayy'
      };
      expect(whisperProcessor(result, {username: 'TestR'})).toEqual({
        text: result.text,
        from: 'You ',
        target: null,
        commType: 'whisper to yourself, '
      });
    });
  });

  describe('If the whisperer is another user, targeting the user', () => {
    it('should return a whisper object with the appropriate fields', () => {
      let result = {
        from: 'TestR',
        target: 'tester',
        text: 'Ayy'
      };
      expect(whisperProcessor(result, {username: 'tester'})).toEqual({
        text: result.text,
        from: result.from,
        target: 'you',
        commType: ' whispers to '
      });
    });
  });
});
