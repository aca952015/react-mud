'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {dropItem, dropAll} from '../../app/actions/inventory-actions.js';
import newItem, {itemData} from '../../app/data/items.js';
import dropHandler from '../../app/handlers/drop-handler.js';

describe('dropHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [newItem('potions', 'health potion'), newItem('potions', 'mana potion'), newItem('potions', 'health potion')]
  };

  describe('With no args', () => {
    it('should return an error object with the feedback "Drop what?"', () => {
      expect(dropHandler('drop')).toEqual({...returnObj, feedback: 'Drop what?'});
    });
  });

  describe('With argument of all', () => {
    it('should return a dropAll object', () => {
      expect(dropHandler('drop', 'all', props)).toEqual({
        emitType: 'dropAll',
        itemArray: props.inventory,
        funcsToCall: [newMessage, dropAll],
        feedback: 'You drop everything you\'re carrying.'
      });
    });
  });

  describe('With dot notation targeting', () => {
    describe('With the full term', () => {
      it('should return a drop object with the right item', () => {
        expect(dropHandler('drop', '3.potion', props)).toEqual({
          emitType: 'drop',
          item: props.inventory[2],
          funcsToCall: [newMessage, dropItem],
          feedback: `You drop ${itemData['potions']['health potion'].short}.`
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return a drop object with the right item', () => {
        expect(dropHandler('drop', '3.pot', props)).toEqual({
          emitType: 'drop',
          item: props.inventory[2],
          funcsToCall: [newMessage, dropItem],
          feedback: `You drop ${itemData['potions']['health potion'].short}.`
        });
      });
    });
  });

  describe('With mixed case', () => {
    it('should return a drop object with the right item', () => {
      expect(dropHandler('drop', '3.pOtIoN', props)).toEqual({
        emitType: 'drop',
        item: props.inventory[2],
        funcsToCall: [newMessage, dropItem],
        feedback: `You drop ${itemData['potions']['health potion'].short}.`
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return a drop object with the right item', () => {
      expect(dropHandler('drop', 'potion', props)).toEqual({
        emitType: 'drop',
        item: props.inventory[0],
        funcsToCall: [newMessage, dropItem],
        feedback: `You drop ${itemData['potions']['health potion'].short}.`
      });
    });
  });

  describe('With a valid item that the user doesn\'t have', () => {
    it('should return an error object with the feedback "You don\'t seem to be carrying that"', () => {
      expect(dropHandler('drop', 'key', props)).toEqual({
        ...returnObj,
        feedback: 'You don\'t seem to be carrying that.'
      });
    });
  });
});
