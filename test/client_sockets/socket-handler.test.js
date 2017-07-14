'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import newMob from '../../app/data/mobs.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {enterCombat, damageUser, slayEnemy, escapeCombat, addEffect, removeEffect} from '../../app/actions/combat-actions.js';
import whisperProcessor from '../../app/processors/whisper-processor.js';
import moveProcessor from '../../app/processors/move-processor.js';
import {getItem, dropItem, getAll, dropAll} from '../../app/actions/inventory-actions.js';
import {changeRoom} from '../../app/actions/move-actions.js';
import {tickRegen} from '../../app/actions/user-actions.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {endCreation, setCreationStep, setUsername, incrementCreationStep, loginUser, loginEquipment} from '../../app/actions/login-actions.js';
import newItem from '../../app/data/items.js';

describe('socketHandlers', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');
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

  describe('Move', () => {
    it('should dispatch a changeRoom with the new room', done => {
      player1.emit('move', {direction: 'down'});
      player1.on('move', res => {
        expect(props.dispatch.calledWith(changeRoom(res))).toEqual(true);
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

  describe('initialConnect', () => {
    let player3;

    afterEach(done => {
      player3.disconnect();
      done();
    });

    it('should dispatch loginUser and loginEquipment', done => {
      player3 = io.connect('http://0.0.0.0:5000', ioOptions);
      player3.on('connect', () => {
        socketHandlers({socket: player3, props});
        player3.on('initialConnect', res => {
          expect(props.dispatch.calledWith(loginUser(res.user))).toEqual(true);
          expect(props.dispatch.calledWith(loginEquipment(res.equipment))).toEqual(true);
          done();
        });
      });
    });
  });

  describe('loginSuccessful', () => {
    describe('While in the Login Room', () => {
      it('should dispatch endCreation, setCreationStep to 0, set the user\'s equipment and user stats, then teleport to the Nexus', done => {
        player1.emit('createCharacter', {...user, newUsername: 'Bob', password: 'banana', equipment});
        player1.on('loginSuccessful', res => {
          expect(props.dispatch.calledWith(endCreation())).toEqual(true);
          expect(props.dispatch.calledWith(setCreationStep({step: 0}))).toEqual(true);
          expect(props.dispatch.calledWith(loginUser(res.loginUser))).toEqual(true);
          expect(props.dispatch.calledWith(loginEquipment(res.loginEquipment))).toEqual(true);
          expect(props.dispatch.calledWith(changeRoom('Nexus'))).toEqual(true);
          done();
        });
      });
    });

    describe('While originally elsewhere', () => {
      let player4;
      beforeEach(done => {
        player4 = io.connect('http://0.0.0.0:5000', ioOptions);
        props = {...props, currentRoom: 'Town Square'};
        player4.on('connect', () => {
          socketHandlers({socket: player4, props});
          done();
        });
      });

      afterEach(done => {
        player4.disconnect();
        done();
      });

      it('should call changeRoom with the proper room', done => {
        player4.emit('createCharacter', {...user, newUsername: 'Davy', password: 'banana', equipment});
        player4.on('loginSuccessful', () => {
          expect(props.dispatch.calledWith(changeRoom('Town Square'))).toEqual(true);
          done();
        });
      });
    });
  });

  describe('loginFail', () => {
    it('should set creationStep to 0 and dispatch a message of invalid login', done => {
      player1.emit('login', {username: 'Bobby', password: 'ayy'});
      player1.on('loginFail', () => {
        expect(props.dispatch.calledWith(setCreationStep({step: 0}))).toEqual(true);
        expect(props.dispatch.calledWith((newMessage({
          feedback: 'Invalid password or that character doesn\'t exist. Enter "new" or a character name to login.'}
        )))).toEqual(true);
        done();
      });
    });
  });

  describe('nameAvailable', () => {
    it('should call setUsername, incrementCreationStep, and give instructions to set a password', done => {
      player1.emit('checkUsername', {newUsername: 'Stevie'});
      player1.on('nameAvailable', name => {
        expect(props.dispatch.calledWith((setUsername({newUsername: `${name[0].toUpperCase()}${name.slice(1)}`})))).toEqual(true);
        expect(props.dispatch.calledWith((incrementCreationStep()))).toEqual(true);
        expect(props.dispatch.calledWith((newMessage({feedback: 'Please enter a password for your character.'})))).toEqual(true);
        done();
      });
    });
  });

  describe('whisperSuccess', () => {
    it('should dispatch a newMessage with the result passed into the whisperProcessor', done => {
      player1.emit('whisper', {target: 'player2'});
      player1.on('whisperSuccess', res => {
        expect(props.dispatch.calledWith(newMessage(whisperProcessor(res, 'player1')))).toEqual(true);
        done();
      });
    });
  });

  describe('whisperFail', () => {
    it('should dispatch a newMessage with the feedback "I don\'t see that person here."', done => {
      player1.emit('whisper', {target: 'Duder'});
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
    describe('With less damage than the user\'s health', () => {
      it('should dispatch damageUser and newMessage', done => {
        player1.emit('testDamage');
        player1.on('damage', dmgObj => {
          expect(props.dispatch.calledWith(damageUser(dmgObj.damage))).toEqual(true);
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
      let lowHealthPropsWhileAlive = {...props, dispatch: sinon.spy(), hp: 1};
      let lowHealthPropsWhileDead = {...props, hp: 1, dispatch: sinon.spy(), effects: {death: true}};

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

  describe('forceDrop', () => {
    it('should dispatch dropItem with the ID returned', done => {
      player1.emit('move', {direction: 'down'});
      player1.emit('put', {item: newItem('potions', 'health potion'), container: 'backpack'});
      player1.on('forceDrop', item => {
        expect(props.dispatch.calledWith(dropItem({item}))).toEqual(true);
        done();
      });
    });
  });

  describe('forceDropAll', () => {
    it('should dispatch dropAll', done => {
      player1.emit('putAllInRoomContainer', {container: 'backpack', itemArray: [newItem('potions', 'health potion')]});
      player1.on('forceDropAll', () => {
        expect(props.dispatch.calledWith(dropAll())).toEqual(true);
        done();
      });
    });
  });

  describe('forceGet', () => {
    it('should dispatch getItem with the item returned', done => {
      player1.emit('getFromContainer', {item: 'potion', container: 'backpack'});
      player1.on('forceGet', item => {
        expect(props.dispatch.calledWith(getItem(item))).toEqual(true);
        done();
      });
    });
  });

  describe('getAll', () => {
    it('should dispatch getAll with the itemArray', done => {
      player1.emit('pickUpItem', {item: 'all'});
      player1.on('getAll', itemArray => {
        expect(props.dispatch.calledWith(getAll(itemArray))).toEqual(true);
        done();
      });
    });
  });

  describe('tickListeners', () => {
    describe('If not dead', () => {
      it('should dispatch tickRegen', done => {
        player1.emit('triggerTick');
        player1.on('tick', () => {
          expect(props.dispatch.calledWith(tickRegen())).toEqual(true);
          done();
        });
      });
    });

    describe('If dead', () => {
      let player6, deadProps = {...props, dispatch: sinon.spy(), effects: {death: true}};
      beforeEach(done => {
        player6 = io.connect(url, ioOptions);
        player6.on('connect', () => {
          socketHandlers({socket: player6, props: deadProps});
          done();
        });
      });

      afterEach(done => {
        player6.disconnect();
        done();
      });

      it('should not call tickRegen', done => {
        player6.emit('triggerTick');
        player6.on('tick', () => {
          expect(deadProps.dispatch.calledWith(tickRegen())).toEqual(false);
          done();
        });
      });
    });
  });
});
