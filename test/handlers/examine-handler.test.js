'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import examineHandler from '../../app/handlers/examine-handler.js';
import newItem, {itemData} from '../../app/data/items.js';

describe('examineHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [newItem('potions', 'health potion'), newItem('keys', 'gallows key'), newItem('potions', 'health potion')]
  };

  describe('With no args', () => {
    it('should return an error object with the feedback "Examine what?"', () => {
      expect(examineHandler('examine')).toEqual({...returnObj, feedback: 'Examine what?'});
    });
  });

  describe('With dot notation targeting', () => {
    describe('With the full term', () => {
      it('should return an examine object with the correct item', () => {
        expect(examineHandler('examine', '2.potion', null, props)).toEqual({
          ...returnObj,
          feedback: itemData['potions']['health potion'].description
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return an examine object with the correct item', () => {
        expect(examineHandler('examine', '2.po', null, props)).toEqual({
          ...returnObj,
          feedback: itemData['potions']['health potion'].description
        });
      });
    });
  });

  describe('With mixed case', () => {
    it('should return an examine object with the correct item', () => {
      expect(examineHandler('examine', '2.pOtIoN', null, props)).toEqual({
        ...returnObj,
        feedback: itemData['potions']['health potion'].description
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return an examine object with the correct item', () => {
      expect(examineHandler('examine', 'key', null, props)).toEqual({
        ...returnObj,
        feedback: itemData['keys']['gallows key'].description
      });
    });
  });

  describe('With a valid target that the user isn\'t carrying', () => {
    it('should return an error object with the feedback "You aren\'t carrying that."', () => {
      expect(examineHandler('examine', 'sword', null, props)).toEqual({
        ...returnObj,
        feedback: 'You aren\'t carrying that.'
      });
    });
  });
});
