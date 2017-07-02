'use strict';

import {changeRoom} from '../../app/actions/move-actions.js';

describe('changeRoom', () => {
  it('should return an object with type CHANGE_ROOM and payload of whatever was passed in', () => {
    expect(changeRoom('Nexus')).toEqual({type: 'CHANGE_ROOM', payload: 'Nexus'});
  });
});
