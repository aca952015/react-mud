'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {truncateDescription, clearDescription, addDescriptionParagraph} from '../../app/actions/user-actions.js';
import descriptionHandler from '../../app/handlers/description-handler.js';

describe('descriptionHandler', () => {
  describe('With no args', () => {
    it('should return the current description', () => {
      expect(descriptionHandler('desc', undefined, {description: ['Desc1']})).toEqual({
        funcsToCall: [newMessage],
        playerDescription: ['Desc1']
      });
    });
  });

  describe('With an arg of clear', () => {
    it('should return a clearDescription object', () => {
      expect(descriptionHandler('desc', 'clear', {description: ['Desc1']})).toEqual({
        funcsToCall: [newMessage, clearDescription],
        playerDescription: ['No description set.'],
        emitType: 'changeDescription'
      });
    });
  });

  describe('With an arg of -', () => {
    describe('With a description of only one paragraph', () => {
      it('should return a truncateDescription object with playerDescription of none set.', () => {
        expect(descriptionHandler('desc', '-', {description: ['Desc1']})).toEqual({
          funcsToCall: [newMessage, truncateDescription],
          playerDescription: ['No description set.'],
          emitType: 'changeDescription'
        });
      });
    });
  });
});
