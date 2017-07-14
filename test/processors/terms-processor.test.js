'use strict';

import termsProcessor from '../../app/processors/terms-processor.js';
import newItem from '../../app/data/items.js';

describe('termsProcessor', () => {
  let searchArray = [newItem('keys', 'gallows key'), newItem('potions', 'health potion'), newItem('potions', 'mana potion')];

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
    describe('With the full term', () => {
      it('should return the first match', () => {
        expect(termsProcessor(searchArray, ['key'])).toEqual(searchArray[0]);
      });
    });

    describe('With fuzzy matching', () => {
      it('should return the item specified by the notation', () => {
        expect(termsProcessor(searchArray, ['ke'])).toEqual(searchArray[0]);
      });
    });

    describe('With mixed case', () => {
      it('should return the item specified by the notation', () => {
        expect(termsProcessor(searchArray, ['Ke'])).toEqual(searchArray[0]);
      });
    });
  });
});
