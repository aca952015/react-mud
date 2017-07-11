'use strict';

import io from 'socket.io-client';
import {Character} from '../../model/character.js';
import closeServer from '../lib/test-server.js';
import {ioOptions} from '../lib/io-options.js';

describe('check username', () => {
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
    Character.remove({})
    .then(() => {
      closeServer();
      done();
    });
  });

  describe('With a name available', () => {
    it('should return a nameAvailable event', done => {
      player1.emit('checkUsername', {newUsername: 'Bob'});
      player1.on('nameAvailable', res => {
        expect(res).toEqual('Bob');
        done();
      });
    });
  });
});
