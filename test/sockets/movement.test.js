'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import {ioOptions} from '../lib/io-options';

describe('movement', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      done();
    });
  });

  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('Seeing another player login', () => {
    it('should emit a movementArrive with a direction of login', done => {
      player1.emit('move', {direction: 'login'});
      player2.on('movementArrive', res => {
        expect(res.username).toEqual('player1');
        expect(res.direction).toEqual('login');
        done();
      });
    });
  });
});
