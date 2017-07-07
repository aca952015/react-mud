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
    inventory: [
      newItem('equipment', 'leather helm'),
      newItem('potions', 'health potion'),
      newItem('equipment', 'leather helm'),
      newItem('equipment', 'leather pauldrons'),
      newItem('equipment', 'leather breastplate'),
      newItem('equipment', 'leather leggings'),
      newItem('equipment', 'leather boots')
    ],
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

  describe('With an argument of "all"', () => {
    let result1 = {
      funcsToCall: [wearEquipment, newMessage, dropItem],
      equip: props.inventory[0],
      item: props.inventory[0],
      feedback: `You equip ${props.inventory[0].short} on your ${props.inventory[0].slot}.`,
      emitType: 'wearItem'
    };
    let result5 = {
      funcsToCall: [wearEquipment, newMessage, dropItem],
      equip: props.inventory[6],
      item: props.inventory[6],
      feedback: `You equip ${props.inventory[6].short} on your ${props.inventory[6].slot}.`,
      emitType: 'wearItem'
    };
    describe('With nothing equipped', () => {
      describe('With no equipment in the inventory', () => {
        it('should return feedback of "You aren\'t carrying anything to wear."', () => {
          expect(wearHandler('wear', 'all', {...props, inventory: []})).toEqual({
            ...defaultObj,
            feedback: 'You aren\'t carrying anything to wear.'
          });
        });
      });

      describe('With valid equipment', () => {
        it('should dispatch wearEquipment 5 times and emit wearItem 5 times', () => {
          let resetProps = {...props, dispatch: sinon.spy(), socket: {emit: sinon.spy()}};
          expect(wearHandler('wear', 'all', resetProps)).toEqual({});
          expect(resetProps.dispatch.calledWith(wearEquipment(result1))).toEqual(true);
          expect(resetProps.dispatch.calledWith(wearEquipment(result5))).toEqual(true);
          expect(resetProps.socket.emit.callCount).toEqual(5);
        });
      });
    });

    describe('With items already equipped', () => {
      it('should dispatch wearEquipment 5 times, removeItem 2 times, and emit 5 times', () => {
        let resetProps = {
          ...props,
          equipment: {
            head: null,
            shoulders: newItem('equipment', 'leather pauldrons'),
            chest: newItem('equipment', 'leather pauldrons'),
            legs: null,
            feet: null
          },
          dispatch: sinon.spy(),
          socket: {
            emit: sinon.spy()
          }
        };
        let result2 = {
          funcsToCall: [quietlyAddItem, removeItem, wearEquipment, dropItem, newMessage],
          equip: resetProps.inventory[4],
          item: resetProps.inventory[4],
          quietAdd: resetProps.equipment.chest,
          removeEquip: resetProps.equipment.chest,
          feedback: `You swap ${resetProps.equipment.chest.short} with ${resetProps.inventory[4].short}.`,
          emitType: 'swapEquips'
        };
        let result3 = {
          funcsToCall: [quietlyAddItem, removeItem, wearEquipment, dropItem, newMessage],
          equip: resetProps.inventory[3],
          item: resetProps.inventory[3],
          quietAdd: resetProps.equipment.shoulders,
          removeEquip: resetProps.equipment.shoulders,
          feedback: `You swap ${resetProps.equipment.shoulders.short} with ${resetProps.inventory[3].short}.`,
          emitType: 'swapEquips'
        };

        expect(wearHandler('wear', 'all', resetProps)).toEqual({});
        expect(resetProps.dispatch.calledWith(wearEquipment(result1))).toEqual(true);
        expect(resetProps.dispatch.calledWith(wearEquipment(result5))).toEqual(true);
        expect(resetProps.dispatch.calledWith(removeItem(result3))).toEqual(true);
        expect(resetProps.dispatch.calledWith(removeItem(result2))).toEqual(true);
        expect(resetProps.socket.emit.callCount).toEqual(5);
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
      it('should call swap items and call a swapItem event', () => {
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
        
        expect(wearHandler('wear', 'helm', equippedProps)).toEqual({
          funcsToCall: [quietlyAddItem, removeItem, wearEquipment, dropItem, newMessage],
          equip: props.inventory[0],
          item: props.inventory[0],
          quietAdd: equippedProps.equipment.head,
          removeEquip: equippedProps.equipment.head,
          feedback: `You swap ${equippedProps.equipment.head.short} with ${props.inventory[0].short}.`,
          emitType: 'swapEquips'
        });
      });
    });
  });
});
