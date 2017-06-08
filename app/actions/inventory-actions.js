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

export function quietlyDestroyItem(item) {
  return {
    type: 'QUIETLY_DESTROY_ITEM',
    payload: item.item
  };
}
