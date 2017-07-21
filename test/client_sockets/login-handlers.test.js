'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {newMessage} from '../../app/actions/message-actions.js';
import {changeRoom} from '../../app/actions/move-actions.js';
import {initialState as user} from '../../app/data/user-initial-state.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {endCreation, setCreationStep, setUsername, incrementCreationStep, loginUser, loginEquipment, loginEffects} from '../../app/actions/login-actions.js';

describe('Login handler client listeners', () => {
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
          expect(props.dispatch.calledWith(loginUser({loginUser: res.user}))).toEqual(true);
          expect(props.dispatch.calledWith(loginEquipment({loginEquipment: res.equipment}))).toEqual(true);
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
          expect(props.dispatch.calledWith(loginUser({loginUser: res.loginUser}))).toEqual(true);
          expect(props.dispatch.calledWith(loginEquipment({loginEquipment: res.loginEquipment}))).toEqual(true);
          expect(props.dispatch.calledWith(loginEffects({loginEffects: res.effects}))).toEqual(true);
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

  describe('already connected', () => {
    let player8, connectProps = {...props, dispatch: sinon.spy()};
    beforeEach(done => {
      new Character({...user, username: 'Bobby-Jo', equipment, effects: {}})
      .hashPassword('banana')
      .then(char => char.save())
      .then(() => {
        player1.emit('changeName', 'Bobby-Jo');
        player8 = io.connect(url, ioOptions);
        player8.on('connect', () => {
          socketHandlers({socket: player8, props: connectProps});
          done();
        });
      });
    });

    afterEach(done => {
      Character.remove({})
      .then(() => {
        player8.disconnect();
        done();
      });
    });

    it('should return a generalMessage telling the player they\'re already connected', done => {
      player8.emit('login', {password: 'banana', username: 'Bobby-Jo'});
      player8.on('alreadyConnected', () => {
        expect(connectProps.dispatch.calledWith(newMessage({feedback: 'That user is already logged in. Enter "new" or a character name to login.'})))
        .toEqual(true);
        done();
      });
    });
  });
});
