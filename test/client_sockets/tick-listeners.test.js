'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {tickRegen} from '../../app/actions/user-actions.js';
import {decrementEffectDurations} from '../../app/actions/skill-actions.js';
import {newMessage} from '../../app/actions/message-actions.js';

describe('Tick client listeners', () => {
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
    effects: {infusion: {atk: 3, mat: 3, duration: 1, expirationMessage: 'Test', expireFunction: sinon.spy()}}
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

  describe('tickListeners', () => {
    it('should call decrementEffectDurations', done => {
      player1.emit('triggerTick');
      player1.on('tick', () => {
        expect(props.dispatch.calledWith(decrementEffectDurations())).toEqual(true);
        done();
      });
    });

    it('should dispatch newMessage for any effects about to expire', done => {
      player1.emit('triggerTick');
      player1.on('tick', () => {
        expect(props.dispatch.calledWith(newMessage({feedback: props.effects.infusion.expirationMessage}))).toEqual(true);
        expect(props.effects.infusion.expireFunction.called).toEqual(true);
        done();
      });
    });

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
