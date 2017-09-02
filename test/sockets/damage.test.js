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
      player1.emit('teleport', 'Test - Nexus');
      player1.emit('updateSocket');
      player1.on('updateComplete', () => {
        player1.emit('changeName', 'player1');
        player1.emit('kill', {target: 'bat'});
      });
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
    describe('With a room that isn\'t already slated to be reset', () => {
      it('should emit a slayEnemy event', done => {
        player1.emit('damage', dmgObj);
        player1.on('slayEnemy', res => {
          expect({...res, combat: {...res.combat, targets: ['player1']}}).toEqual({...dmgObj.enemy, hp: -1});
          done();
        });
      });
    });

    describe('With a room that is already slated to be reset', () => {
      const tempDmgObj = {...dmgObj};
      beforeEach(done => {
        player1.emit('kill', {target: 'zombie'});
        player1.on('enterCombat', res => {
          tempDmgObj.enemy = res;
          tempDmgObj.damage = 50;
          done();
        });
      });

      it('should emit a slayEnemy event', done => {
        player1.emit('damage', tempDmgObj);
        player1.on('slayEnemy', res => {
          expect({...res, combat: {...res.combat, targets: ['player1']}}).toEqual({
            ...tempDmgObj.enemy,
            hp: res.maxHP - 50,
            combat: {active: true, targets: ['player1']}
          });
          done();
        });
      });
    });
  });

  describe('With a damage event on a target that was already slain', () => {
    it('should return a slayEnemy event', done => {
      // The test server has two bats in the room, so both need to be slain
      // to make sure that the target no longer exists.
      player1.emit('damage', {...dmgObj, damage: 5});
      player1.emit('damage', dmgObj);
      player1.on('slayEnemy', enemy => {
        expect(enemy.id).toEqual(dmgObj.enemy.id);
        done();
      });
    });
  });
});
