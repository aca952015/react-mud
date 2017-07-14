'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('escape combat', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('teleport', 'Nexus');
      player2.emit('teleport', 'Nexus');
      player2.emit('updateSocket');
      player2.on('updateComplete', () => done());
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

  describe('With a mob that is fighting multiple players', () => {
    beforeEach(done => {
      player1.emit('kill', {target: 'bat'});
      player2.emit('kill', {target: 'bat'});
      player2.on('enterCombat', () => done());
    });

    it('should remove only that user from the mob\'s targets list and keep them in combat', done => {
      player1.emit('escapeCombat');
      player2.on('generalMessage', res => {
        expect(res.feedback).toEqual('A small bat turns their attention to other combatants!');
        done();
      });
    });
  });

  describe('With a mob that is only fighting one player', () => {
    beforeEach(done => {
      player2.emit('escapeCombat');
      player1.emit('kill', {target: 'bat'});
      player1.on('enterCombat', () => done());
    });

    it('should remove the mob from combat and restore it to full health', done => {
      player1.emit('escapeCombat');
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('A small bat returns to full health.');
        done();
      });
    });
  });
});
