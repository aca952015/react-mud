'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {removeItem} from '../../app/actions/item-actions.js';
import {quietlyAddItem} from '../../app/actions/inventory-actions.js';
import removeHandler from '../../app/handlers/remove-handler.js';
import newItem from '../../app/data/items.js';

describe('removeHandler', () => {
  const defaultObj = {funcsToCall: [newMessage]};
  let props = {
    equipment: {
      head: newItem('equipment', 'leather helm'),
      shoulders: newItem('equipment', 'leather helm'),
      chest: null,
      legs: null,
      feet: null
    }
  };

  describe('With no arguments', () => {
    it('should return feedback of "Remove what?"', () => {
      expect(removeHandler('remove', null, props)).toEqual({
        ...defaultObj,
        feedback: 'Remove what?'
      });
    });
  });

  describe('With an argument of all', () => {
    describe('If the user isn\'t wearing anything', () => {
      it('should return feedback that they aren\'t wearing anything', () => {
        expect(removeHandler('remove', 'all', {
          ...props,
          equipment: {
            ...props.equipment,
            head: null,
            shoulders: null
          }
        })).toEqual({
          ...defaultObj,
          feedback: 'You aren\'t wearing anything to remove.'
        });
      });
    });
  });

  describe('With an item the user isn\'t wearing', () => {
    it('should return feedback of "You aren\'t wearing that."', () => {
      expect(removeHandler('remove', 'hat', props)).toEqual({
        ...defaultObj,
        feedback: 'You aren\'t wearing that.'
      });
    });
  });

  describe('With a valid item', () => {
    describe('With the full term', () => {
      it('should return an object calling quietlyAddItem, removeItem, and newMessage', () => {
        expect(removeHandler('remove', 'helm', props)).toEqual({
          funcsToCall: [quietlyAddItem, removeItem, newMessage],
          emitType: 'removeItem',
          quietAdd: props.equipment.head,
          removeEquip: props.equipment.head,
          feedback: `You remove ${props.equipment.head.short}.`
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return an object calling quietlyAddItem, removeItem, and newMessage', () => {
        expect(removeHandler('remove', 'he', props)).toEqual({
          funcsToCall: [quietlyAddItem, removeItem, newMessage],
          emitType: 'removeItem',
          quietAdd: props.equipment.head,
          removeEquip: props.equipment.head,
          feedback: `You remove ${props.equipment.head.short}.`
        });
      });
    });

    describe('With dot notation', () => {
      it('should return an object calling quietlyAddItem, removeItem, and newMessage', () => {
        expect(removeHandler('remove', '2.helm', props)).toEqual({
          funcsToCall: [quietlyAddItem, removeItem, newMessage],
          emitType: 'removeItem',
          quietAdd: props.equipment.shoulders,
          removeEquip: props.equipment.shoulders,
          feedback: `You remove ${props.equipment.shoulders.short}.`
        });
      });
    });

    describe('With mixed case', () => {
      it('should return an object calling quietlyAddItem, removeItem, and newMessage', () => {
        expect(removeHandler('remove', 'HeLm', props)).toEqual({
          funcsToCall: [quietlyAddItem, removeItem, newMessage],
          emitType: 'removeItem',
          quietAdd: props.equipment.head,
          removeEquip: props.equipment.head,
          feedback: `You remove ${props.equipment.head.short}.`
        });
      });
    });
  });
});
