'use strict';

export function getItem(item) {
  return {
    type: 'GET_ITEM',
    payload: item
  };
}
