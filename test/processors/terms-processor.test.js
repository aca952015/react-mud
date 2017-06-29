'use strict';

import termsProcessor from '../../app/processors/terms-processor.js';
import newItem from '../../app/data/items.js';

describe('termsProcessor', () => {
  let searchArray = [newItem('gallows key'), newItem('health potion'), newItem('mana potion')];

  describe('With dot notation', () => {
    it('should return the item specified by the notation', () => {
      expect(termsProcessor(searchArray, ['2', 'potion'])).toEqual(searchArray[2]);
    });
  });

  describe('With normal targeting', () => {
    it('should return the first match', () => {
      expect(termsProcessor(searchArray, ['key'])).toEqual(searchArray[0]);
    });
  });
});
