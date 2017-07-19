'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {damageUser, removeEffect, fullRestore} from '../../app/actions/combat-actions.js';

describe('Resurrect client listeners', () => {
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

  describe('resurrect', () => {
    let player7, socketSpy, resProps = {...props, dispatch: sinon.spy(), maxHP: 20};
    beforeEach(done => {
      player7 = io.connect(url, ioOptions);
      socketSpy = sinon.spy(player7, 'emit');
      player7.emit('updateEffects', {death: true});
      player7.emit('teleport', 'Nexus');
      player7.emit('updateSocket');
      player7.on('updateComplete', () => {
        socketHandlers({socket: player7, props: resProps});
        done();
      });
    });

    afterEach(done => {
      player7.disconnect();
      done();
    });

    it('should dispatch fullRestore, damage the user for half health, remove the death effect, and emit the new effects', done => {
      player7.emit('resurrect');
      player7.on('resurrect', () => {
        expect(resProps.dispatch.calledWith(fullRestore())).toEqual(true);
        expect(resProps.dispatch.calledWith(damageUser({damage: Math.round(resProps.maxHP / 2)}))).toEqual(true);
        expect(resProps.dispatch.calledWith(removeEffect('death'))).toEqual(true);
        expect(socketSpy.calledWith('updateEffects', {})).toEqual(true);
        done();
      });
    });
  });
});
