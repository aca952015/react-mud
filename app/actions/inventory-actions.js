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
    payload: item
  };
}

export function quietAddItem(item) {
  return {
    type: 'QUIET_ADD_ITEM',
    payload: item.quietAdd
  };
}
