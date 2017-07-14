'use strict';

import giveHandler from '../../app/handlers/give-handler.js';
import newItem from '../../app/data/items.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('giveHandler', () => {
  let props = {inventory: [newItem('potions', 'health potion')], username: 'duder'};

  let defaultObj = {funcsToCall: [newMessage]};
  describe('Without the correct number of arguments', () => {
    it('should return a feedback error of "give what to whom"', () => {
      expect(giveHandler('give', 'potion', props)).toEqual({
        ...defaultObj,
        feedback: 'Give what to whom? (format: GIVE <item> <target>)'
      });
    });
  });

  describe('An item the user isn\'t carrying', () => {
    describe('Without dot notation', () => {
      it('should return a feedback error of not seeing that item', () => {
        expect(giveHandler('give', 'bob bob', props)).toEqual({
          ...defaultObj,
          feedback: 'You don\'t seem to be carrying that.'
        });
      });
    });

    describe('With dot notation', () => {
      it('should return a feedback error of not seeing that item', () => {
        expect(giveHandler('give', '2.potion bob', props)).toEqual({
          ...defaultObj,
          feedback: 'You don\'t seem to be carrying that.'
        });
      });
    });
  });

  describe('With an argument of all', () => {
    describe('With no inventory', () => {
      it('should return a feedback error of not having anything to give', () => {
        expect(giveHandler('give', 'all bob', {...props, inventory: []})).toEqual({
          ...defaultObj,
          feedback: 'You aren\'t carrying anything to give.'
        });
      });
    });

    describe('With at least one item', () => {
      it('should return a giveAll object', () => {
        expect(giveHandler('give', 'all bob', props)).toEqual({
          emitType: 'giveAll',
          itemArray: props.inventory,
          target: 'bob'
        });
      });
    });
  });

  describe('With a valid item', () => {
    describe('With mixed case', () => {
      it('should return a give object', () => {
        expect(giveHandler('give', 'POtIoN BoB', props)).toEqual({
          emitType: 'give',
          item: props.inventory[0],
          target: 'bob'
        });
      });
    });

    describe('Without dot notation', () => {
      describe('With full terms', () => {
        it('should return a give object', () => {
          expect(giveHandler('give', 'potion bob', props)).toEqual({
            emitType: 'give',
            item: props.inventory[0],
            target: 'bob'
          });
        });
      });

      describe('With fuzzy matching', () => {
        it('should return a give object', () => {
          expect(giveHandler('give', 'po bob', props)).toEqual({
            emitType: 'give',
            item: props.inventory[0],
            target: 'bob'
          });
        });
      });
    });

    describe('With dot notation', () => {
      it('should return a give object', () => {
        props.inventory.push(newItem('potions', 'health potion'));
        expect(giveHandler('give', '2.potion bob', props)).toEqual({
          emitType: 'give',
          item: props.inventory[1],
          target: 'bob'
        });
      });
    });
  });

  describe('To yourself', () => {
    it('should return a feedback error', () => {
      expect(giveHandler('give', 'potion DuDer', props)).toEqual({
        ...defaultObj,
        feedback: 'You can\'t give items to yourself.'
      });
    });
  });
});
