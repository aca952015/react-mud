'use strict';

export function changeRoom(room) {
  return {
    type: 'CHANGE_ROOM',
    payload: room
  };
}
