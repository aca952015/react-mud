'use strict';

export function addToContainer(result) {
  return {
    type: 'ADD_TO_CONTAINER',
    payload: {
      item: result.item,
      container: result.container
    }
  };
}

export function dropAll() {
  return {type: 'DROP_ALL'};
}

export function dropItem(item) {
  return {
    type: 'DROP_ITEM',
    payload: item.item
  };
}

export function getAll(itemObj) {
  return {
    type: 'GET_ALL',
    payload: itemObj.itemArray,
    container: itemObj.container // This distinguishes between getAll from room and getAll from inventory
  };
}

export function getFromContainer(result) {
  return {
    type: 'GET_FROM_CONTAINER',
    payload: {
      item: result.item,
      container: result.container
    }
  };
}

export function getItem(item) {
  return {
    type: 'GET_ITEM',
    payload: item
  };
}

export function putAll(itemObj) {
  return {
    type: 'PUT_ALL',
    payload: itemObj
  };
}

export function quietlyAddItem(item) {
  return {
    type: 'QUIETLY_ADD_ITEM',
    payload: item.quietAdd
  };
}
