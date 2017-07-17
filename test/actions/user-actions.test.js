'use strict';

import {truncateDescription, addDescriptionParagraph, clearDescription, tickRegen} from '../../app/actions/user-actions.js';

describe('User actions', () => {
  describe('truncateDescription', () => {
    it('should return an object with a type of TRUNCATE_DESCRIPTION', () => {
      expect(truncateDescription()).toEqual({type: 'TRUNCATE_DESCRIPTION'});
    });
  });

  describe('addDescriptionParagraph', () => {
    it('should return an object with a type of TRUNCATE_DESCRIPTION and a payload of the last element of a playerDescription', () => {
      expect(addDescriptionParagraph({playerDescription: ['dude', 'berb']})).toEqual({type: 'ADD_DESCRIPTION_PARAGRAPH', payload: 'berb'});
    });
  });

  describe('clearDescription', () => {
    it('should return an object with a type of CLEAR_DESCRIPTION', () => {
      expect(clearDescription()).toEqual({type: 'CLEAR_DESCRIPTION'});
    });
  });

  describe('tickRegen', () => {
    it('should return an object with a type of "TICK_REGEN"', () => {
      expect(tickRegen()).toEqual({type: 'TICK_REGEN'});
    });
  });
});