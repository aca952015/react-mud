'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';

describe('Whisper', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
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

  describe('With a valid whisper target in the room', () => {
    it('should emit a whisperSuccess event to everyone', done => {
      player1.emit('whisper', {target: 'player2', text: 'ayy'});
      player1.on('whisperSuccess', res => {
        expect(res.text).toEqual('ayy');
        expect(res.from).toEqual('player1');
        expect(res.target).toEqual('player2');
        done();
      });
    });
  });
});
