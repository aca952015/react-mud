'use strict';

export function getItem(item) {
  return {
    type: 'GET_ITEM',
    payload: item
  };
}

export function dropItem(item) {
  return {
    type: 'DROP_ITEM',
    payload: item.item
  };
}

export function quietlyAddItem(item) {
  return {
    type: 'QUIETLY_ADD_ITEM',
    payload: item.quietAdd
  };
}

export function addToContainer(result) {
  return {
    type: 'ADD_TO_CONTAINER',
    payload: {
      item: result.item,
      container: result.container
    }
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

export function getAll(itemObj) {
  return {
    type: 'GET_ALL',
    payload: itemObj.itemArray,
    container: itemObj.container
  };
}

export function putAll(itemObj) {
  return {
    type: 'PUT_ALL',
    payload: itemObj
  };
}

export function dropAll() {
  return {type: 'DROP_ALL'};
}
