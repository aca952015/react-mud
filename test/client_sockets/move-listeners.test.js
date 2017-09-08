'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import moveProcessor from '../../app/processors/move-processor.js';
import {changeRoom} from '../../app/actions/move-actions.js';

describe('Move client listeners', () => {
  const TEST_ROOM = 'Test - Nexus';
  let player1, player2, player3, url = 'http://0.0.0.0:5000';

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
    player3 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player3.emit('teleport', TEST_ROOM);
      player1.emit('changeName', 'player1');
      player1.emit('teleport', TEST_ROOM);
      player2.emit('changeName', 'player2');
      player2.emit('teleport', TEST_ROOM);
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
      player3.disconnect();
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

  describe('movementLeave', () => {
    describe('With a username (as expected)', () => {
      it('should dispatch a newMessage with a from and feedback', done => {
        player2.emit('move', {direction: 'down'});
        player1.on('movementLeave', res => {
          expect(props.dispatch.calledWith(newMessage({from: res.username, feedback: ` moves ${res.direction}.`}))).toEqual(true);
          done();
        });
      });
    });

    describe('Without a username (unexpected)', () => {
      it('should do absolutely nothing', done => {
        player3.emit('move', {direction: 'down'});
        player1.on('movementLeave', () => {
          expect(props.dispatch.calledWith(newMessage({from: 'Player3', feedback: ' moves down.'}))).toEqual(false);
          done();
        });
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
});
