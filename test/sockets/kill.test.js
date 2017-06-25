'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('Kill', () => {
  let player1;

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player1.emit('changeName', 'player1');
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

  describe('Without a target', () => {
    it('should return feedback asking to kill what?', done => {
      player1.emit('kill', {target: undefined});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('Kill what?');
        done();
      });
    });
  });
});
