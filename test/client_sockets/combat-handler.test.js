'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import newMob from '../../app/data/mobs.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {enterCombat, damageUser, slayEnemy, escapeCombat, addEffect} from '../../app/actions/combat-actions.js';

describe('combat client sockets', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';

  let props = {
    username: 'player1',
    currentRoom: 'Login Room',
    dispatch: sinon.spy(),
    character: {
      description: 'Test description'
    },
    combat: {
      active: true,
      targets: [{id: 1, target: 'Some test thing'}]
    },
    effects: {}
  };

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('teleport', 'Nexus');
      player2.emit('changeName', 'player2');
      player2.emit('teleport', 'Nexus');
      player2.emit('updateSocket');
      player2.on('updateComplete', () => {
        socketHandlers({
          socket: player1,
          props
        });
        done();
      });
    });
  });

  afterEach(done => {
    Character.remove({})
    .then(() => {
      player1.disconnect();
      player2.disconnect();
      done();
    });
  });

  afterAll(done => {
    closeServer();
    done();
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
          expect(props.dispatch.calledWith(newMessage({
            combatLog: {
              from: {
                friendly: 'You'
              },
              interaction: ' move to attack ',
              target: {
                enemy: bat.short
              },
              punctuation: '.'
            }
          }))).toEqual(true);
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
    describe('If there is only a damage property', () => {
      it('should only dispatch damageUser', done => {
        socketHandlers({socket: player2, props});

        player1.emit('skill', {
          skillTypes: ['healing', 'magical'],
          funcsToCall: [],
          damage: -3,
          enemy: 'player2',
          echoLog: {
            from: {
              friendly: 'player1'
            },
            pre: ' emits a soothing blue aura, restoring ',
            damage: -3,
            post: ' health to ',
            target: {
              friendly: 'player2'
            }
          },
          combatLog: {
            from: {
              friendly: 'You'
            },
            pre: ' emit a soothing blue aura, restoring ',
            damage: -3,
            post: ' health to ',
            target: {
              friendly: 'player2'
            }
          }
        });
        player2.on('damage', res => {
          expect(res.enemy).toEqual(undefined);
          expect(props.dispatch.calledWith(damageUser({damage: res.damage}))).toEqual(true);
          done();
        });
      });
    });

    describe('With less damage than the user\'s health', () => {
      it('should dispatch damageUser and newMessage', done => {
        player1.emit('testDamage');
        player1.on('damage', dmgObj => {
          expect(props.dispatch.calledWith(damageUser({damage: dmgObj.damage}))).toEqual(true);
          expect(props.dispatch.calledWith((newMessage({
            combatLog: {
              from: {
                enemy: `${dmgObj.enemy.short[0].toUpperCase()}${dmgObj.enemy.short.slice(1)}`,
              },
              pre: ' deals ',
              damage: dmgObj.damage,
              post: ' damage to ',
              target: {
                friendly: 'you'
              },
              punctuation: '.'
            }
          })))).toEqual(true);
          done();
        });
      });
    });

    describe('With enough damage to reduce the user to 0 or less HP', () => {
      let player5;
      let lowHealthPropsWhileAlive = {...props, dispatch: sinon.spy(), hp: 0};
      let lowHealthPropsWhileDead = {...props, hp: 0, dispatch: sinon.spy(), effects: {death: true}};

      describe('If they are not already dead', () => {
        beforeEach(done => {
          player5 = io.connect(url, ioOptions);
          player5.on('connect', () => {
            socketHandlers({socket: player5, props: lowHealthPropsWhileAlive});
            done();
          });
        });

        afterEach(done => {
          player5.disconnect();
          done();
        });

        it('should dispatch a SLAIN message, addEffect with death, and emit an update effects', done => {
          player5.emit('testDamage');
          player5.on('damage', () => {
            expect(lowHealthPropsWhileAlive.dispatch.calledWith(newMessage({feedback: 'You have been SLAIN!'}))).toEqual(true);
            expect(lowHealthPropsWhileAlive.dispatch.calledWith(escapeCombat())).toEqual(true);
            expect(lowHealthPropsWhileAlive.dispatch.calledWith(addEffect('death'))).toEqual(true);
            done();
          });
        });
      });

      describe('If they\'ve already been killed', () => {
        beforeEach(done => {
          player5 = io.connect(url, ioOptions);
          player5.on('connect', () => {
            socketHandlers({socket: player5, props: lowHealthPropsWhileDead});
            done();
          });
        });

        afterEach(done => {
          player5.disconnect();
          done();
        });

        it('should not dispatch the various death effects', done => {
          player5.emit('testDamage');
          player5.on('damage', () => {
            expect(lowHealthPropsWhileDead.dispatch.calledWith(newMessage({feedback: 'You have been SLAIN!'}))).toEqual(false);
            expect(lowHealthPropsWhileDead.dispatch.calledWith(escapeCombat())).toEqual(false);
            expect(lowHealthPropsWhileDead.dispatch.calledWith(addEffect('death'))).toEqual(false);
            done();
          });
        });
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
});
