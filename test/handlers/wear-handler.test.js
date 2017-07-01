'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {wearEquipment} from '../../app/actions/item-actions.js';
import wearHandler from '../../app/handlers/wear-handler.js';
import newItem from '../../app/data/items.js';

describe('wearHandler', () => {
  const defaultObj = {funcsToCall: [newMessage]};
  const props = {
    inventory: [newItem('leather helm', 'equipment'), newItem('health potion')]
  };

  describe('With no args', () => {
    it('should return feedback of "Wear what?"', () => {
      expect(wearHandler('wear')).toEqual({
        ...defaultObj,
        feedback: 'Wear what?'
      });
    });
  });

  describe('With an item the user isn\'t carrying', () => {
    it('should return feedback of "You aren\'t carrying that."', () => {
      expect(wearHandler('wear', 'sword', null, props)).toEqual({
        ...defaultObj,
        feedback: 'You aren\'t carrying that.'
      });
    });
  });

  describe('With an item that isn\'t wearable', () => {
    it('should return feedback of "You can\'t wear that."', () => {
      expect(wearHandler('wear', 'potion', null, props)).toEqual({
        ...defaultObj,
        feedback: 'You can\'t wear that.'
      });
    });
  });

  describe('With a valid item the user is carrying', () => {
    describe('With a full term', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'helm', null, props)).toEqual({
          funcsToCall: [wearEquipment, newMessage],
          equipment: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });

    describe('With mixed case', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'HeLm', null, props)).toEqual({
          funcsToCall: [wearEquipment, newMessage],
          equipment: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'he', null, props)).toEqual({
          funcsToCall: [wearEquipment, newMessage],
          equipment: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });
  });
});
