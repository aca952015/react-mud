'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import socketHandlers from '../../app/handlers/socket-handlers.js';
import newMob from '../../app/data/mobs.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {enterCombat, damageUser, slayEnemy} from '../../app/actions/combat-actions.js';
import whisperProcessor from '../../app/processors/whisper-processor.js';
import moveProcessor from '../../app/processors/move-processor.js';
import itemPickUpProcessor from '../../app/processors/item-pickup-processor.js';
import {getItem} from '../../app/actions/inventory-actions.js';

describe('socketHandlers', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');
  let props = {
    username: 'player1',
    dispatch: sinon.spy(),
    character: {
      description: 'Test description'
    },
    combat: {
      active: true,
      targets: [{id: 1, target: 'Some test thing'}]
    }
  };
  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      socketHandlers({
        socket: player1,
        props
      });
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

  describe('Move', () => {
    it('should change the player\'s currentRoom to whatever got passed in', done => {
      player1.emit('move', {direction: 'down'});
      player1.on('move', res => {
        expect(player1.currentRoom).toEqual(res);
        done();
      });
    });
  });

  describe('generalMessage', () => {
    it('should dispatch a newMessage with the result', done => {
      player1.emit('lock', {direction: 'down'});
      player1.on('generalMessage', res => {
        expect(props.dispatch.calledWith(newMessage(res))).toEqual(true);
        done();
      });
    });
  });

  describe('whisperSuccess', () => {
    it('should dispatch a newMessage with the result passed into the whisperProcessor', done => {
      player1.emit('whisper', {target: 'player2'});
      player1.on('whisperSuccess', res => {
        expect(props.dispatch.calledWith(newMessage(whisperProcessor(res, player1)))).toEqual(true);
        done();
      });
    });
  });

  describe('whisperFail', () => {
    it('should dispatch a newMessage with the feedback "I don\'t see that person here."', done => {
      player1.emit('whisper', {target: 'Bob'});
      player1.on('whisperFail', () => {
        expect(props.dispatch.calledWith(newMessage({feedback: 'I don\'t see that person here.'}))).toEqual(true);
        done();
      });
    });
  });

  describe('movementLeave', () => {
    it('should dispatch a newMessage with a from and feedback', done => {
      player2.emit('move', {direction: 'down'});
      player1.on('movementLeave', res => {
        expect(props.dispatch.calledWith(newMessage({from: res.username, feedback: ` moves ${res.direction}.`}))).toEqual(true);
        done();
      });
    });
  });

  describe('movementArrive', () => {
    it('should dispatch a newMessage with a moveProcessor', done => {
      player2.emit('move', {direction: 'down'});
      player2.emit('move', {direction: 'up'});
      player1.on('movementArrive', res => {
        expect(props.dispatch.calledWith(newMessage(moveProcessor(res)))).toEqual(true);
        done();
      });
    });
  });

  describe('pickUpItem', () => {
    it('should dispatch a newMessage with an itemPickUpProcessor', done => {
      player2.emit('pickUpItem', {item: 'potion'});
      player1.on('pickUpItem', res => {
        expect(props.dispatch.calledWith(newMessage(itemPickUpProcessor(res, player1)))).toEqual(true);
        done();
      });
    });
  });

  describe('itemPickedUp', () => {
    it('should dispatch a newMessage and a getItem', done => {
      player1.emit('pickUpItem', {item: 'potion'});
      player1.on('itemPickedUp', res => {
        expect(props.dispatch.calledWith(newMessage({feedback: `You pick up ${res.item.short}.`}))).toEqual(true);
        expect(props.dispatch.calledWith(getItem(res.item))).toEqual(true);
        done();
      });
    });
  });

  describe('enterCombat', () => {
    describe('If the user is not already fighting the target', () => {
      it('should return the mob being attacked', done => {
        player1.emit('kill', {target: 'bat'});
        player1.on('enterCombat', res => {
          let bat = newMob('bat');
          bat.id = res.id;
          props.combat.targets.push(res);
          expect(res).toEqual(bat);
          expect(props.dispatch.calledWith(newMessage({feedback: `You move to attack ${bat.short}.`}))).toEqual(true);
          expect(props.dispatch.calledWith(enterCombat(bat))).toEqual(true);
          done();
        });
      });
    });

    describe('If the user is already fighting the target', () => {
      it('should return the mob is already being fought', done => {
        player1.emit('kill', {target: 'bat'});
        player1.on('enterCombat', () => {
          expect(props.dispatch.calledWith((newMessage({feedback: 'You\'re already fighting a small bat!'})))).toEqual(true);
          done();
        });
      });
    });
  });

  describe('damage', () => {
    it('should dispatch damageUser and newMessage', done => {
      player1.emit('testDamage');
      player1.on('damage', dmgObj => {
        expect(props.dispatch.calledWith(damageUser(dmgObj.damage))).toEqual(true);
        expect(props.dispatch.calledWith((newMessage({feedback: `${dmgObj.enemy.short} damages you for ${dmgObj.damage}.`})))).toEqual(true);
        done();
      });
    });
  });

  describe('slayEnemy', () => {
    it('should dispatch slayEnemy with the target', done => {
      player1.emit('damage', {enemy: props.combat.targets[1], damage: 10});
      player1.on('slayEnemy', res => {
        expect(props.dispatch.calledWith(slayEnemy(res))).toEqual(true);
        done();
      });
    });
  });

  describe('endCombat', () => {
    it('should dispatch slayEnemy with the ID returned', done => {
      player1.emit('damage', {enemy: props.combat.targets[1], damage: 10});
      player1.on('endCombat', id => {
        expect(props.dispatch.calledWith(slayEnemy({id}))).toEqual(true);
        done();
      });
    });
  });
});
