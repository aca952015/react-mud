'use strict';

import {addToContainer, putAll} from '../../app/actions/inventory-actions.js';
import {newMessage} from '../../app/actions/message-actions.js';
import newItem from '../../app/data/items.js';
import putHandler from '../../app/handlers/put-handler.js';

describe('putHandler', () => {
  let defaultObj = {funcsToCall: [newMessage]};
  let props = {inventory: [newItem('potions', 'health potion'), newItem('potions', 'health potion'), newItem('containers', 'backpack'), newItem('containers', 'backpack'), newItem('containers', 'corpse')]};

  describe('With too few arguments', () => {
    it('should return feedback with a syntax error', () => {
      expect(putHandler('put', 'potion', props)).toEqual({
        ...defaultObj,
        feedback: 'Put what where? (format: PUT <item> <target> or PUT <item> IN <target>)'
      });
    });
  });

  describe('With an item the user isn\'t carrying', () => {
    it('should return feedback that they aren\'t carrying it', () => {
      expect(putHandler('put', 'bob backpack', props)).toEqual({
        ...defaultObj,
        feedback: 'You don\'t seem to be carrying that.'
      });
    });
  });

  describe('Attempting to put a container inside itself', () => {
    it('should return that you can\'t do that', () => {
      expect(putHandler('put', 'backpack backpack', props)).toEqual({
        ...defaultObj,
        feedback: 'You can\'t put a container inside itself.'
      });
    });
  });

  describe('Attempting to put an invalid item type into a container', () => {
    it('should return that you can\'t do that', () => {
      expect(putHandler('put', 'corpse backpack', props)).toEqual({
        ...defaultObj,
        feedback: 'That container doesn\'t hold that type of item.'
      });
    });
  });

  describe('Attempting to put an item into another item that isn\'t a container', () => {
    it('should return that you can\'t do that', () => {
      expect(putHandler('put', 'backpack potion', props)).toEqual({
        ...defaultObj,
        feedback: 'That isn\'t a container.'
      });
    });
  });

  describe('In a container the user is carrying', () => {
    describe('With dot notation on the item, but not the container', () => {
      describe('With mixed case', () => {
        it('should return a put object with addToContainer and newMessage funcsToCall', () => {
          expect(putHandler('put', '2.PoTioN BacKpACk', props)).toEqual({
            emitType: 'putInContainer',
            item: props.inventory[1],
            container: props.inventory[2],
            funcsToCall: [newMessage, addToContainer],
            feedback: `You put ${props.inventory[1].short} in ${props.inventory[2].short}.`
          });
        });
      });
    });

    describe('With dot notation on the item and on the container', () => {
      describe('With full terms', () => {
        it('should return a put object with addToContainer and newMessage funcsToCall', () => {
          expect(putHandler('put', '2.potion 2.backpack', props)).toEqual({
            emitType: 'putInContainer',
            item: props.inventory[1],
            container: props.inventory[3],
            funcsToCall: [newMessage, addToContainer],
            feedback: `You put ${props.inventory[1].short} in ${props.inventory[3].short}.`
          });
        });
      });

      describe('With fuzzy matching', () => {
        it('should return a put object with addToContainer and newMessage funcsToCall', () => {
          expect(putHandler('put', '2.pot 2.bac', props)).toEqual({
            emitType: 'putInContainer',
            item: props.inventory[1],
            container: props.inventory[3],
            funcsToCall: [newMessage, addToContainer],
            feedback: `You put ${props.inventory[1].short} in ${props.inventory[3].short}.`
          });
        });
      });
    });

    describe('With dot notation on the container, but not the item', () => {
      it('should return a put object with addToContainer and newMessage funcsToCall', () => {
        expect(putHandler('put', 'potion 2.backpack', props)).toEqual({
          emitType: 'putInContainer',
          item: props.inventory[0],
          container: props.inventory[3],
          funcsToCall: [newMessage, addToContainer],
          feedback: `You put ${props.inventory[0].short} in ${props.inventory[3].short}.`
        });
      });
    });

    describe('With normal targeting for all', () => {
      it('should return a put object with addToContainer and newMessage funcsToCall', () => {
        expect(putHandler('put', 'potion backpack', props)).toEqual({
          emitType: 'putInContainer',
          item: props.inventory[0],
          container: props.inventory[2],
          funcsToCall: [newMessage, addToContainer],
          feedback: `You put ${props.inventory[0].short} in ${props.inventory[2].short}.`
        });
      });
    });

    describe('With an argument of all', () => {
      describe('With at least one valid item', () => {
        it('should return a putAllInInventoryContainer object', () => {
          expect(putHandler('put', 'all backpack', props)).toEqual({
            emitType: 'putAllInInventoryContainer',
            itemArray: [props.inventory[0], props.inventory[1], props.inventory[3], props.inventory[4]],
            container: props.inventory[2],
            funcsToCall: [newMessage, putAll],
            feedback: `You put everything you can into ${props.inventory[2].short}.`
          });
        });
      });

      describe('With a container, but no other items', () => {
        it('should return feedback of "You aren\'t carrying anything to put in that container."', () => {
          expect(putHandler('put', 'all backpack', {inventory: [newItem('containers', 'backpack')]})).toEqual({
            ...defaultObj,
            feedback: 'You aren\'t carrying anything to put in that container.'
          });
        });
      });
    });

    describe('With optional IN parameter', () => {
      it('should return a put object with addToContainer and newMessage funcsToCall', () => {
        expect(putHandler('put', '2.potion in backpack', props)).toEqual({
          emitType: 'putInContainer',
          item: props.inventory[1],
          container: props.inventory[2],
          funcsToCall: [newMessage, addToContainer],
          feedback: `You put ${props.inventory[1].short} in ${props.inventory[2].short}.`
        });
      });
    });
  });

  describe('In a container the user is not carrying', () => {
    describe('With a specific item', () => {
      it('should return a put object with just the item and target', () => {
        expect(putHandler('put', 'potion satchel', props)).toEqual({
          emitType: 'put',
          item: props.inventory[0],
          container: 'satchel'
        });
      });
    });

    describe('With an argument of all', () => {
      it('should return a putAllInRoomContainer object with an itemArray', () => {
        expect(putHandler('put', 'all satchel', props)).toEqual({
          emitType: 'putAllInRoomContainer',
          itemArray: props.inventory,
          container: 'satchel'
        });
      });
    });
  });
});
