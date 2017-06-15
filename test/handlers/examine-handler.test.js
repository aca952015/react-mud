'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import examineHandler from '../../app/handlers/examine-handler.js';
import {itemData} from '../../app/data/items.js';

describe('examineHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [itemData['health potion'], itemData['gallows key'], itemData['health potion']]
  };

  describe('With no args', () => {
    it('should return an error object with the feedback "Examine what?"', () => {
      expect(examineHandler('examine')).toEqual({...returnObj, feedback: 'Examine what?'});
    });
  });

  describe('With dot notation targeting', () => {
    it('should return an examine object with the correct item', () => {
      expect(examineHandler('examine', '2.potion', null, props)).toEqual({
        ...returnObj,
        feedback: itemData['health potion'].description
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return an examine object with the correct item', () => {
      expect(examineHandler('examine', 'key', null, props)).toEqual({
        ...returnObj,
        feedback: itemData['gallows key'].description
      });
    });
  });
});
