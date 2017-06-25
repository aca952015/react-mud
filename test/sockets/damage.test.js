'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('damage', () => {
  let player1;
  let dmgObj = {damage: 3};
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('kill', {target: 'bat'});
    });
    player1.on('enterCombat', res => {
      dmgObj.enemy = res;
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

  describe('With less damage than the target\'s remaining HP', () => {
    it('should only emit a generalMessage response with damage feedback', done => {
      player1.emit('damage', dmgObj);
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('You deal 3 damage to a small bat.');
        done();
      });
    });
  });
});
