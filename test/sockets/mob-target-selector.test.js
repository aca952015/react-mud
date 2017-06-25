'use strict';

import io from 'socket.io-client';
import ioOptions from '../lib/io-options.js';
import closeServer from '../lib/test-server.js';
import newMob from '../../app/data/mobs.js';

describe('mobTargetSelector', () => {
  let player1, player2;
  let bat = newMob('bat');
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2 = io.connect('http://0.0.0.0:5000', ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('kill', {target: 'bat'});
    });
    player1.on('enterCombat', () => {
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

  it('should pick a target from a mob\'s current targets and emit a damage event', done => {
    player1.emit('testMobSelector');
    player1.on('damage', res => {
      expect(res.enemy).toEqual({
        ...bat,
        id: res.enemy.id,
        combat: {
          active: true,
          targets: ['player1'] // Check that player2 didn't get drawn into combat somehow
        }
      });
      expect(res.damage).toEqual(bat.atk);
      done();
    });
  });
});
