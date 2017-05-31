'use strict';

export function getItem(item) {
  console.log(item);
  return {
    type: 'GET_ITEM',
    payload: item
  };
}
