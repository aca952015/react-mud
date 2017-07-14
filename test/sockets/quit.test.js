'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';

describe('Quit socket listener', () => {
  let player1;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      done();
    });
  });

  afterEach(done => {
    player1.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  it('should move the player to the Login Room', done => {
    player1.emit('quit');
    player1.on('move', res => {
      expect(res).toEqual('Login Room');
      done();
    });
  });
});
