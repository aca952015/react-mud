'use strict';

import combatProcessor from '../../app/processors/combat-processor.js';
import io from 'socket.io-client';
import ioOptions from '../lib/io-options.js';
import closeServer from '../lib/test-server.js';

describe('combatProcessor', () => {
  require('../lib/test-server.js');
  let player1;
  let props = {
    combat: {
      active: true,
      targets: []
    },
    character: {
      atk: 2
    }
  };

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('kill', {target: 'bat'});
    });
    player1.on('enterCombat', res => {
      props.combat.targets.push(res);
      done();
    });
  });

  afterAll(done => {
    player1.disconnect();
    closeServer();
    done();
  });

  it('should emit a damage event and receive a generalMessage response', done => {
    combatProcessor(player1, props);
    player1.on('generalMessage', res => {
      expect(res.feedback).toEqual('You deal 2 damage to a small bat.');
      done();
    });
  });
});
