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

    describe('With more than one paragraph', () => {
      it('should remove the last paragraph and call truncateDescription', () => {
        expect(descriptionHandler('desc', '-', {description: ['Desc1', 'Desc2']})).toEqual({
          funcsToCall: [newMessage, truncateDescription],
          playerDescription: ['Desc1'],
          emitType: 'changeDescription'
        });
      });
    });
  });

  describe('With an arg of +', () => {
    describe('With no description set', () => {
      it('should return an addParagraph object and change the description to the arg', () => {
        expect(descriptionHandler('desc', '+ Ayy', {description: ['No description set.']})).toEqual({
          funcsToCall: [newMessage, addDescriptionParagraph],
          playerDescription: ['Ayy'],
          emitType: 'changeDescription'
        });
      });
    });

    describe('With a description in place', () => {
      it('should add a new paragraph', () => {
        expect(descriptionHandler('desc', '+ Ayy', {description: ['Desc1']})).toEqual({
          funcsToCall: [newMessage, addDescriptionParagraph],
          playerDescription: ['Desc1', 'Ayy'],
          emitType: 'changeDescription'
        });
      });
    });
  });

  describe('With anything else', () => {
    it('should return a feedback error', () => {
      expect(descriptionHandler('desc', '+ayy', {description: ['Desc1']})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'I\'m not sure what you\'re trying to do to your description. Try HELP DESCRIPTION for formatting.'
      });
    });
  });
});
