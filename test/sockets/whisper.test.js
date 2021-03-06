'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('Whisper', () => {
  const TEST_ROOM = 'Test - Nexus';
  let player1, player2, player3, alien, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player3 = io.connect(url, ioOptions);
    alien = io.connect(url, ioOptions);
    alien.on('connect', () => {
      player3.emit('changeName', '');
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('teleport', TEST_ROOM);
      player2.emit('teleport', TEST_ROOM);
      player2.emit('updateSocket');
      alien.emit('changeName', 'alien');
      player2.on('updateComplete', () => done());
    });
  });

  afterEach(done => {
    player1.disconnect();
    player2.disconnect();
    player3.disconnect();
    alien.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('With a valid whisper target in the room', () => {
    describe('With a living whisperer', () => {
      it('should emit a whisperSuccess event to everyone', done => {
        player1.emit('whisper', {target: 'player2', text: 'ayy'});
        player1.on('whisperSuccess', res => {
          expect(res.text).toEqual('ayy');
          expect(res.from).toEqual('player1');
          expect(res.target).toEqual('player2');
          done();
        });
      });
    });

    describe('With a dead whisperer to a dead target', () => {
      beforeEach(done => {
        player1.emit('updateEffects', {death: true});
        player2.emit('updateEffects', {death: true});
        player1.emit('updateSocket');
        player2.emit('updateSocket');
        player2.on('updateComplete', () => done());
      });

      it('should emit a whisperSuccess event to everyone with a ghost', done => {
        player1.emit('whisper', {target: 'player2', text: 'ayy'});
        player1.on('whisperSuccess', res => {
          expect(res.text).toEqual('ayy');
          expect(res.from).toEqual('The ghost of player1');
          expect(res.target).toEqual('The ghost of player2');
          done();
        });
      });
    });
  });

  describe('With a valid whisper target, but not in the room', () => {
    it('should emit a whisperFail event', done => {
      player2.emit('move', {direction: 'down'});
      player1.emit('whisper', {target: 'alien', text: 'ayy'});
      player1.on('whisperFail', () => {
        done();
      });
    });
  });

  describe('With an invalid whisper target', () => {
    it('should emit a whisperFail event', done => {
      player1.emit('whisper', {target: 'Bob', text: 'ayy'});
      player1.on('whisperFail', () => {
        done();
      });
    });
  });
});
