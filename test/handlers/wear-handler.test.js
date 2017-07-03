'use strict';

import sinon from 'sinon';
import {newMessage} from '../../app/actions/message-actions.js';
import {wearEquipment, removeItem} from '../../app/actions/item-actions.js';
import {dropItem, quietlyAddItem} from '../../app/actions/inventory-actions.js';
import wearHandler from '../../app/handlers/wear-handler.js';
import newItem from '../../app/data/items.js';

describe('wearHandler', () => {
  const defaultObj = {funcsToCall: [newMessage]};
  const props = {
    inventory: [newItem('equipment', 'leather helm'), newItem('potions', 'health potion'), newItem('equipment', 'leather helm')],
    equipment: {
      head: null,
      shoulders: null,
      chest: null,
      legs: null,
      feet: null
    },
    dispatch: sinon.spy(),
    socket: {
      emit: sinon.spy()
    }
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
      expect(wearHandler('wear', 'sword', props)).toEqual({
        ...defaultObj,
        feedback: 'You aren\'t carrying that.'
      });
    });
  });

  describe('With an item that isn\'t wearable', () => {
    it('should return feedback of "You can\'t wear that."', () => {
      expect(wearHandler('wear', 'potion', props)).toEqual({
        ...defaultObj,
        feedback: 'You can\'t wear that.'
      });
    });
  });

  describe('With a valid item the user is carrying', () => {
    describe('With a full term', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'helm', props)).toEqual({
          funcsToCall: [wearEquipment, newMessage, dropItem],
          equip: props.inventory[0],
          item: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });

    describe('With mixed case', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'HeLm', props)).toEqual({
          funcsToCall: [wearEquipment, newMessage, dropItem],
          equip: props.inventory[0],
          item: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', 'he', props)).toEqual({
          funcsToCall: [wearEquipment, newMessage, dropItem],
          equip: props.inventory[0],
          item: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
      });
    });

    describe('With dot notation', () => {
      it('should return an object with emitType wearItem and proper funcsToCall', () => {
        expect(wearHandler('wear', '2.hel', props)).toEqual({
          funcsToCall: [wearEquipment, newMessage, dropItem],
          item: props.inventory[2],
          equip: props.inventory[2],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[2].short} on your ${props.inventory[2].slot}.`
        });
      });
    });

    describe('With an item already in the slot', () => {
      it('should call removeItem and emit a removeItem event', () => {
        let equippedProps = {
          ...props,
          equipment: {
            head: newItem('equipment', 'leather helm'),
            shoulders: null,
            chest: null,
            legs: null,
            feet: null
          }
        };
        let result = {
          funcsToCall: [quietlyAddItem, removeItem, newMessage],
          emitType: 'removeItem',
          quietAdd: equippedProps.equipment.head,
          removeEquip: equippedProps.equipment.head,
          feedback: `You remove ${equippedProps.equipment.head.short}.`
        };

        expect(wearHandler('wear', 'helm', equippedProps)).toEqual({
          funcsToCall: [wearEquipment, newMessage, dropItem],
          equip: props.inventory[0],
          item: props.inventory[0],
          emitType: 'wearItem',
          feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`
        });
        expect(props.dispatch.calledWith(removeItem(result))).toEqual(true);
        expect(props.socket.emit.calledWith(result.emitType, result)).toEqual(true);
      });
    });
  });
});
