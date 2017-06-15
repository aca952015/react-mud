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
});
