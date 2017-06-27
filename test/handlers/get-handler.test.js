'use strict';

import {newMessage} from '../../app/actions/message-actions.js';
import {getFromContainer} from '../../app/actions/inventory-actions.js';
import getHandler from '../../app/handlers/get-handler.js';
import newItem from '../../app/data/items.js';

describe('getHandler', () => {
  let backpack1 = newItem('backpack');
  backpack1.container.contains.push(newItem('health potion'));
  backpack1.container.contains.push(newItem('health potion'));

  let backpack2 = newItem('backpack');
  backpack2.container.contains.push(newItem('health potion'));
  backpack2.container.contains.push(newItem('health potion'));

  let props = {inventory: [backpack1, backpack2, newItem('gallows key')]};
  describe('With no args', () => {
    it('should return an error object with feedback "Get what?"', () => {
      expect(getHandler('get')).toEqual({funcsToCall: [newMessage], feedback: 'Get what?'});
    });
  });

  describe('With args', () => {
    describe('With no optional container arg', () => {
      it('should return a proper emit object to be handled by the server', () => {
        expect(getHandler('get', 'potion')).toEqual({emitType: 'pickUpItem', item: 'potion'});
      });
    });

    describe('With optional container arg', () => {
      describe('With an item the user is carrying', () => {
        describe('That isn\'t a container', () => {
          it('should inform the user it isn\'t a container', () => {
            expect(getHandler('get', 'potion key', null, props)).toEqual({
              funcsToCall: [newMessage],
              feedback: 'That isn\'t a container.'
            });
          });
        });

        describe('That is a container', () => {
          describe('That doesn\'t hold the designated item', () => {
            it('should inform the user that that item isn\'t seen', () => {
              expect(getHandler('get', 'sword backpack', null, props)).toEqual({
                funcsToCall: [newMessage],
                feedback: 'I don\'t see that item in that container.'
              });
            });
          });

          describe('That does hold the designated item', () => {
            describe('With dot notation on the item, but not the container', () => {
              it('should return a getFromContainer object with newMessage and getFromContainer funcsToCall', () => {
                expect(getHandler('get', '2.potion backpack', null, props)).toEqual({
                  emitType: 'getFromContainer',
                  funcsToCall: [newMessage, getFromContainer],
                  item: props.inventory[0].container.contains[1],
                  container: props.inventory[0],
                  feedback: `You get ${props.inventory[0].container.contains[1].short} from ${props.inventory[0].short}.`
                });
              });
            });
          });
        });
      });
    });
  });
});
