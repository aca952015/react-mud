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
});
