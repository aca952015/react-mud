'use strict';

import sinon from 'sinon';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import initialConnect from '../../sockets/initial-connect.js';

describe('initialConnect', () => {
  it('should emit an initialConnect object', () => {
    const socket = {emit: sinon.spy()};
    initialConnect(socket);
    expect(socket.emit.calledWith('initialConnect', {
      user: {
        ...user,
        currentRoom: 'Login Room'
      },
      equipment
    })).toEqual(true);
  });
});
