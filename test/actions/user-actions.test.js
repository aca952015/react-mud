'use strict';

import {truncateDescription, addDescriptionParagraph, clearDescription} from '../../app/actions/user-actions.js';

describe('User actions', () => {
  describe('truncateDescription', () => {
    it('should return an object with a type of TRUNCATE_DESCRIPTION', () => {
      expect(truncateDescription()).toEqual({type: 'TRUNCATE_DESCRIPTION'});
    });
  });
});
