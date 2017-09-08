'use strict';

import io from 'socket.io-client';
import sinon from 'sinon';
import {Character} from '../../model/character.js';
import socketHandlers from '../../app/client_sockets/socket-handlers.js';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import {getItem, dropItem, getAll, dropAll} from '../../app/actions/inventory-actions.js';
import newItem from '../../app/data/items.js';

describe('Inventory handler client listeners', () => {
  const TEST_ROOM = 'Test - Nexus';
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
      done();
    });
  });

  afterAll(done => {
    closeServer();
    done();
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
});
