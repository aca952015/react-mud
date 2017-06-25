'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newMob from '../../app/data/mobs.js';

describe('Kill', () => {
  let player1, player2;
  let bat = newMob('bat');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
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

  describe('Without a target', () => {
    it('should return feedback asking to kill what?', done => {
      player1.emit('kill', {target: undefined});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('Kill what?');
        done();
      });
    });
  });

  describe('With dot notation', () => {
    describe('On an enemy that exists', () => {
      it('should return an enterCombat event', done => {
        player1.emit('kill', {target: '2.bat'});
        player1.on('enterCombat', res => {
          expect(res).toEqual({...bat, id: res.id});
          done();
        });
      });
    });

    describe('On an enemy already in combat with another user', () => {
      it('should return an enterCombat event', done => {
        player2.emit('kill', {target: '2.bat'});
        player2.on('enterCombat', res => {
          expect(res).toEqual({
            ...bat,
            id: res.id,
            combat: {
              active: true,
              targets: ['player1']
            }
          });
          done();
        });
      });
    });

    describe('On an enemy that doesn\'t exist', () => {
      it('should return a feedback of not seeing that enemy', done => {
        player1.emit('kill', {target: '3.bat'});
        player1.on('generalMessage', res => {
          expect(res.feedback).toEqual('I don\'t see that enemy here.');
          done();
        });
      });
    });
  });

  describe('With normal targeting', () => {
    it('should return an enterCombat event', done => {
      player1.emit('kill', {target: 'bat'});
      player1.on('enterCombat', res => {
        expect(res).toEqual({...bat, id: res.id});
        done();
      });
    });
  });
});
