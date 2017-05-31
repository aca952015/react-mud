'use strict';

export function updateRooms(rooms) {
  return {
    type: 'UPDATE_ROOMS',
    payload: rooms
  };
}
