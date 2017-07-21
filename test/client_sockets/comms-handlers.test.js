'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import whisperProcessor from '../../app/processors/whisper-processor.js';

describe('Comms handler socket listeners', () => {
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
});
