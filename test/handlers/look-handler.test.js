'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import lookHandler from '../../app/handlers/look-handler.js';
import newItem from '../../app/data/items.js';

describe('lookHandler', () => {
  let props = {
    inventory: [
      {
        ...newItem('containers', 'backpack'),
        container: {
          contains: [newItem('potions', 'health potion')]
        }
      },
      newItem('keys', 'gallows key'),
      {
        ...newItem('containers', 'backpack'),
        container: {
          contains: [newItem('potions', 'health potion')]
        }
      }
    ]
  };

  describe('with no args', () => {
    it('should return a look with target undefined', () => {
      expect(lookHandler('look', undefined, props)).toEqual({
        emitType: 'look',
        target: undefined
      });
    });
  });

  describe('With args, but not IN', () => {
    describe('With mixed case', () => {
      it('should return a look with target of args', () => {
        expect(lookHandler('look', 'BoB', props)).toEqual({
          emitType: 'look',
          target: 'bob'
        });
      });
    });
  });

  describe('With args and with IN', () => {
    describe('Without a proper target', () => {
      it('should return feedback asking to look in what?', () => {
        expect(lookHandler('look', 'in', props)).toEqual({
          funcsToCall: [newMessage],
          feedback: 'Look in what? (format: LOOK IN <container>)'
        });
      });
    });

    describe('Targeting an item the user is carrying', () => {
      describe('That is not a container', () => {
        it('should return feedback that it isn\'t a container', () => {
          expect(lookHandler('look', 'in key', props)).toEqual({
            funcsToCall: [newMessage],
            feedback: 'That isn\'t a container.'
          });
        });
      });

      describe('With dot notation', () => {
        describe('With mixed case', () => {
          it('should return a newMessage with containedItems', () => {
            expect(lookHandler('look', 'in 2.BaCkPAck', props)).toEqual({
              funcsToCall: [newMessage],
              containedItems: props.inventory[2].container.contains
            });
          });
        });
      });

      describe('With normal targeting', () => {
        describe('With the full term', () => {
          it('should return a newMessage with containedItems', () => {
            expect(lookHandler('look', 'in backpack', props)).toEqual({
              funcsToCall: [newMessage],
              containedItems: props.inventory[0].container.contains
            });
          });
        });

        describe('With fuzzy matching', () => {
          it('should return a newMessage with containedItems', () => {
            expect(lookHandler('look', 'in bac', props)).toEqual({
              funcsToCall: [newMessage],
              containedItems: props.inventory[0].container.contains
            });
          });
        });
      });
    });

    describe('Targeting an item the user is not carrying', () => {
      it('should return a lookInContainer emit', () => {
        expect(lookHandler('look', 'in satchel', props)).toEqual({
          emitType: 'lookInContainer',
          container: 'satchel'
        });
      });
    });
  });
});
