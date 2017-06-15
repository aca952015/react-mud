'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {dropItem} from '../../app/actions/inventory-actions.js';
import {itemData} from '../../app/data/items.js';
import dropHandler from '../../app/handlers/drop-handler.js';

describe('dropHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [itemData['health potion'], itemData['mana potion'], itemData['health potion']]
  };

  describe('With no args', () => {
    it('should return an error object with the feedback "Drop what?"', () => {
      expect(dropHandler('drop')).toEqual({...returnObj, feedback: 'Drop what?'});
    });
  });

  describe('With dot notation targeting', () => {
    it('should return a drop object with the right item', () => {
      expect(dropHandler('drop', '3.potion', null, props)).toEqual({
        emitType: 'drop',
        item: itemData['health potion'],
        funcsToCall: [newMessage, dropItem],
        feedback: `You drop ${itemData['health potion'].short}.`
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return a drop object with the right item', () => {
      expect(dropHandler('drop', '3.potion', null, props)).toEqual({
        emitType: 'drop',
        item: itemData['health potion'],
        funcsToCall: [newMessage, dropItem],
        feedback: `You drop ${itemData['health potion'].short}.`
      });
    });
  });
});
