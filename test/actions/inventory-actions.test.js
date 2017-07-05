'use strict';

import {getItem, dropItem, quietlyAddItem, addToContainer, getFromContainer, getAll, putAll} from '../../app/actions/inventory-actions.js';

describe('inventory actions', () => {
  describe('getItem', () => {
    it('should return an object with type GET_ITEM and payload of the item passed in', () => {
      expect(getItem({someItem: 'yep'})).toEqual({type: 'GET_ITEM', payload: {someItem: 'yep'}});
    });
  });

  describe('dropItem', () => {
    it('should return an object with type DROP_ITEM and payload of the item property', () => {
      expect(dropItem({item: 'yep'})).toEqual({type: 'DROP_ITEM', payload: 'yep'});
    });
  });

  describe('quietlyAddItem', () => {
    it('should return an object with type QUIETLY_ADD_ITEM and payload of the quietAdd property', () => {
      expect(quietlyAddItem({item: 'dude', quietAdd: 'ayyy'})).toEqual({type: 'QUIETLY_ADD_ITEM', payload: 'ayyy'});
    });
  });

  describe('addToContainer', () => {
    it('should return an object with type ADD_TO_CONTAINER and a payload with item and container properties', () => {
      expect(addToContainer({item: 'bob', container: 'bag'})).toEqual({type: 'ADD_TO_CONTAINER', payload: {item: 'bob', container: 'bag'}});
    });
  });

  describe('getFromContainer', () => {
    it('should return an object with type GET_FROM_CONTAINER and a payload with item and container properties', () => {
      expect(getFromContainer({item: 'bob', container: 'bag'})).toEqual({type: 'GET_FROM_CONTAINER', payload: {item: 'bob', container: 'bag'}});
    });
  });

  describe('getAll', () => {
    describe('With a container object', () => {
      it('should return an object with type GET_ALL and payload of the array passed in, plus the container', () => {
        expect(getAll({itemArray: ['dude', 'bro'], container: 'derp'})).toEqual({type: 'GET_ALL', payload: ['dude', 'bro'], container: 'derp'});
      });
    });

    describe('With no container object', () => {
      it('should return an object with type GET_ALL and payload of the array passed in', () => {
        expect(getAll({itemArray: ['dude', 'bro']})).toEqual({type: 'GET_ALL', payload: ['dude', 'bro']});
      });
    });
  });

  describe('putAll', () => {
    it('should return an object with type PUT_ALL and payload of the item array', () => {
      expect(putAll(['dude', 'bro'])).toEqual({type: 'PUT_ALL', payload: ['dude', 'bro']});
    });
  });
});
