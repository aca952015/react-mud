'use strict';

import termsProcessor from '../../app/processors/terms-processor.js';
import newItem from '../../app/data/items.js';

describe('termsProcessor', () => {
  let searchArray = [newItem('gallows key'), newItem('health potion'), newItem('mana potion')];

  describe('With dot notation', () => {
    describe('With the full term', () => {
      it('should return the item specified by the notation', () => {
        expect(termsProcessor(searchArray, ['2', 'potion'])).toEqual(searchArray[2]);
      });
    });

    describe('With fuzzy matching', () => {
      it('should return the item specified by the notation', () => {
        expect(termsProcessor(searchArray, ['2', 'po'])).toEqual(searchArray[2]);
      });
    });

    describe('With mixed case', () => {
      it('should return the item specified by the notation', () => {
        expect(termsProcessor(searchArray, ['2', 'pOtI'])).toEqual(searchArray[2]);
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return the first match', () => {
      expect(termsProcessor(searchArray, ['key'])).toEqual(searchArray[0]);
    });
  });
});
