'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {itemData} from '../../app/data/items.js';

describe('Unlock', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';

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

  describe('Unlocking a valid exit', () => {
    describe('With the correct key', () => {
      describe('To the user', () => {
        it('should return a feedback of unlocking the door', done => {
          player1.emit('lock', {direction: 'up', inventory: [itemData['secret key']]});
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('You unlock the door above.');
            done();
          });
        });
      });

      describe('To other players in the room', () => {
        it('should return feedback of the player locking the door', done => {
          player1.emit('lock', {direction: 'up', inventory: [itemData['secret key']]});
          player2.on('generalMessage', res => {
            expect(res.feedback).toEqual('player1 locks the door above.');
            done();
          });
        });
      });
    });
  });
});
