'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options';
import {roomData} from '../../app/data/rooms.js';

describe('movement', () => {
  let player1, player2, url = 'http://0.0.0.0:5000';
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect(url, ioOptions);
    player2 = io.connect(url, ioOptions);
    player2.on('connect', () => {
      player1.emit('changeName', 'player1');
      player2.emit('changeName', 'player2');
      player1.emit('teleport', 'Test - Nexus');
      player2.emit('teleport', 'Test - Nexus');
      player2.emit('updateSocket');
      player2.on('updateComplete', () => done());
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

  describe('Seeing another player login', () => {
    it('should emit a movementArrive with a direction of login', done => {
      player1.emit('move', {direction: 'login'});
      player2.on('movementArrive', res => {
        expect(res.username).toEqual('player1');
        expect(res.direction).toEqual('login');
        done();
      });
    });
  });

  describe('A user moving in a valid, unlocked direction', () => {
    it('should emit a move event with the new room name', done => {
      player1.emit('move', {direction: 'down'});
      player1.on('move', res => {
        expect(res).toEqual('Test - Town Square');
        done();
      });
    });

    describe('With no dead players', () => {
      it('should emit a generalMessage event with feedback, occupants, mobs, and room', done => {
        player1.emit('move', {direction: 'down'});
        player1.on('generalMessage', res => {
          let townSquare = roomData['Test - Town Square'];
          expect(res.feedback).toEqual('You move down.');
          expect(res.occupants).toEqual([]);
          expect(res.room.name).toEqual(townSquare.name);
          expect(res.room.desc).toEqual(townSquare.desc);
          expect(res.room.exits).toEqual(townSquare.exits);
          expect(res.mobs).toEqual(townSquare.mobs);
          done();
        });
      });
    });

    describe('With a dead player', () => {
      let player3;
      beforeEach(done => {
        player3 = io.connect(url, ioOptions);
        player3.on('connect', () => {
          player3.emit('teleport', 'Test - Nexus');
          player3.emit('changeName', 'player3');
          player3.emit('updateEffects', {death: true});
          player3.emit('updateSocket');
          player1.emit('move', {direction: 'down'});
          player3.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player3.disconnect();
        done();
      });

      it('should show a ghost in the occupants', done => {
        player1.emit('move', {direction: 'up'});
        player1.on('generalMessage', res => {
          expect(res.occupants).toEqual(['player2', 'The ghost of player3']);
          done();
        });
      });
    });

    describe('To other users in the room', () => {
      describe('If the mover is alive', () => {
        it('should emit a movementLeave event to other users in the room', done => {
          player1.emit('move', {direction: 'down'});
          player2.on('movementLeave', res => {
            expect(res.username).toEqual('player1');
            expect(res.direction).toEqual('down');
            done();
          });
        });
      });

      describe('If the mover is dead', () => {
        let player3;

        beforeEach(done => {
          player3 = io.connect(url, ioOptions);
          player3.on('connect', () => {
            player3.emit('teleport', 'Test - Nexus');
            player3.emit('changeName', 'player3');
            player3.emit('updateEffects', {death: true});
            player3.emit('updateSocket');
            player3.on('updateComplete', () => done());
          });
        });

        afterEach(done => {
          player3.disconnect();
          done();
        });

        it('should emit a movementLeave event with a ghost from', done => {
          player3.emit('move', {direction: 'down'});
          player1.on('movementLeave', res => {
            expect(res.username).toEqual('The ghost of player3');
            done();
          });
        });
      });
    });
  });

  describe('A user moving in a valid, but locked direction', () => {
    it('should return feedback that the direction is locked', done => {
      player1.emit('move', {direction: 'up'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That way is locked.');
        done();
      });
    });
  });

  describe('Seeing another player arrive', () => {
    it('should return a movementArrive event', done => {
      player2.emit('move', {direction: 'down'});
      player2.emit('move', {direction: 'up'});
      player1.on('movementArrive', res => {
        expect(res.username).toEqual('player2');
        expect(res.direction).toEqual('up');
        done();
      });
    });
  });
});
