'use strict';

import drinkHandler from '../../app/handlers/drink-handler.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {quietlyAddItem, dropItem} from '../../app/actions/inventory-actions.js';
import {itemData} from '../../app/data/items.js';

describe('drinkHandler', () => {
  let returnObj = {funcsToCall: [newMessage]};
  let props = {
    inventory: [itemData['health potion'], itemData['mana potion'], itemData['health potion'], itemData['gallows key']]
  };

  describe('With no args', () => {
    it('should return an error object with feedback of "Drink what?"', () => {
      expect(drinkHandler('drink')).toEqual({...returnObj, feedback: 'Drink what?'});
    });
  });

  describe('With dot notation', () => {
    it('should drink the targeted item', () => {
      expect(drinkHandler('drink', '3.potion', null, props)).toEqual({
        funcsToCall: [newMessage, itemData['health potion'].drink.effect, quietlyAddItem, dropItem],
        amount: itemData['health potion'].drink.amount,
        statToChange: itemData['health potion'].drink.statToChange,
        feedback: itemData['health potion'].drink.desc,
        emitType: 'drink',
        item: itemData['health potion'],
        quietAdd: itemData['empty flask']
      });
    });
  });

  describe('Targeting a valid item in the user\'s inventory', () => {
    it('should drink the targeted item', () => {
      expect(drinkHandler('drink', 'potion', null, props)).toEqual({
        funcsToCall: [newMessage, itemData['health potion'].drink.effect, quietlyAddItem, dropItem],
        amount: itemData['health potion'].drink.amount,
        statToChange: itemData['health potion'].drink.statToChange,
        feedback: itemData['health potion'].drink.desc,
        emitType: 'drink',
        item: itemData['health potion'],
        quietAdd: itemData['empty flask']
      });
    });
  });

  describe('Targeting a valid item not in the user\'s inventory', () => {
    it('should return feedback of "You aren\'t carrying that."', () => {
      expect(drinkHandler('drink', 'potion', null, {inventory: []})).toEqual({
        ...returnObj,
        feedback: 'You aren\'t carrying that.'
      });
    });
  });

  describe('Targeting an invalid item', () => {
    it('should return feedback of "That isn\'t drinkable."', () => {
      expect(drinkHandler('drink', 'key', null, props)).toEqual({
        ...returnObj,
        feedback: 'That isn\'t drinkable.'
      });
    });
  });
});
