'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import socketHandlers from '../../app/handlers/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
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
    }
  };
  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      socketHandlers(player1, props);
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
});
