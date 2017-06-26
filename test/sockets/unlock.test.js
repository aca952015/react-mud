'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('Unlock', () => {
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

  describe('Unlocking a valid exit', () => {
    describe('With the correct key', () => {
      describe('To the user', () => {
        it('should return a feedback of unlocking the door', done => {
          player1.emit('lock', {direction: 'up', inventory: [newItem('secret key')]});
          player1.on('generalMessage', res => {
            expect(res.feedback).toEqual('You unlock the door above.');
            done();
          });
        });
      });

      describe('To other players in the room', () => {
        it('should return feedback of the player locking the door', done => {
          player1.emit('lock', {direction: 'up', inventory: [newItem('secret key')]});
          player2.on('generalMessage', res => {
            expect(res.feedback).toEqual('player1 locks the door above.');
            done();
          });
        });
      });
    });

    describe('With the incorrect key', () => {
      it('should return feedback of not having the right key', done => {
        player2.emit('lock', {direction: 'up', inventory: []});
        player2.on('generalMessage', res => {
          expect(res.feedback).toEqual('You don\'t have the correct key to do that.');
          done();
        });
      });
    });
  });

  describe('Unlocking an invalid exit', () => {
    it('should return feedback of not seeing that exit', done => {
      player1.emit('lock', {direction: 'west', inventory: [newItem('secret key')]});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that exit here.');
        done();
      });
    });
  });

  describe('Unlocking an exit that isn\'t lockable', () => {
    it('should return feedback of the exit not being lockable', done => {
      player1.emit('lock', {direction: 'down', inventory: [newItem('secret key')]});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That exit has nothing to lock.');
        done();
      });
    });
  });
});
