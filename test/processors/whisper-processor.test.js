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
      expect(whisperProcessor(result, 'TestR')).toEqual({
        text: result.text,
        from: 'You ',
        target: result.target,
        commType: 'whisper to '
      });
    });
  });

  describe('If the whisperer is the user and they\'re whispering to themself', () => {
    describe('If the user is alive', () => {
      it('should return a whisper object with the appropriate fields', () => {
        let result = {
          from :'TestR',
          target: 'TestR',
          text: 'Ayy'
        };
        expect(whisperProcessor(result, 'TestR')).toEqual({
          text: result.text,
          from: 'You ',
          target: null,
          commType: 'whisper to yourself, '
        });
      });
    });

    describe('If the user is dead', () => {
      it('should return a whisper object with the appropriate fields', () => {
        let result = {
          from: 'TestR',
          target: 'The ghost of TestR',
          text: 'Ayy'
        };
        expect(whisperProcessor(result, 'TestR')).toEqual({
          text: result.text,
          from: 'You ',
          target: null,
          commType: 'whisper to yourself, '
        });
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
      expect(whisperProcessor(result, 'tester')).toEqual({
        text: result.text,
        from: result.from,
        target: 'you',
        commType: ' whispers to '
      });
    });
  });

  describe('If the whisperer is another user, targeting a third user', () => {
    it('should return a whisper object with the appropriate fields', () => {
      let result = {
        from: 'TestR',
        target: 'Duder',
        text: 'Ayy'
      };
      expect(whisperProcessor(result, 'tester')).toEqual({
        from: result.from,
        target: result.target,
        commType: ' whispers something to '
      });
    });
  });

  describe('If the whisperer is another user, targeting themself', () => {
    describe('If the whisperer is not dead', () => {
      it('should return a whisper object with the appropriate fields', () => {
        let result = {
          from: 'TestR',
          target: 'TestR',
          text: 'Ayy'
        };
        expect(whisperProcessor(result, 'tester')).toEqual({
          from: result.from,
          commType: ' whispers something quietly.',
          target: null
        });
      });
    });

    describe('If the whisperer is dead', () => {
      it('should return a whisper object with the appropriate fields', () => {
        let result = {
          from: 'The ghost of TestR',
          target: 'TestR',
          text: 'Ayy'
        };
        expect(whisperProcessor(result, 'tester')).toEqual({
          from: result.from,
          commType: ' whispers something quietly.',
          target: null
        });
      });
    });
  });
});
