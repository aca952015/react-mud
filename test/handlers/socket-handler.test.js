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
  let player, url = 'http://0.0.0.0:5000';
  let props = {
    dispatch: sinon.spy(),
    character: {
      description: 'Test description'
    }
  };
  beforeAll(done => {
    player = io.connect(url, ioOptions);
    player.on('connect', () => {
      socketHandlers(player, props);
      done();
    });
  });

  afterAll(done => {
    player.disconnect();
    closeServer();
    done();
  });

  describe('Move', () => {
    it('should change the player\'s currentRoom to whatever got passed in', done => {
      player.emit('move', {direction: 'down'});
      player.on('move', res => {
        expect(player.currentRoom).toEqual(res);
        done();
      });
    });
  });
});
