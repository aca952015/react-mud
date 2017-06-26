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
        expect(res).toEqual({
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' deal ',
            damage: dmgObj.damage,
            post: ' damage to ',
            target: {
              enemy: dmgObj.enemy.short
            },
            punctuation: '.'
          }
        });
        done();
      });
    });
  });

  describe('With enough damage to kill the target', () => {
    it('should emit a slayEnemy event', done => {
      player1.emit('damage', dmgObj);
      player1.on('slayEnemy', res => {
        expect({...res, combat: {...res.combat, targets: ['player1']}}).toEqual({...dmgObj.enemy, hp: -1});
        done();
      });
    });
  });

  describe('With a damage event on a target that was already slain', () => {
    it('should return an endCombat event', done => {
      // The test server has two bats in the room, so both need to be slain
      // to make sure that the target no longer exists.
      player1.emit('damage', {...dmgObj, damage: 5});
      player1.emit('damage', dmgObj);
      player1.on('endCombat', id => {
        expect(id).toEqual(dmgObj.enemy.id);
        done();
      });
    });
  });
});
