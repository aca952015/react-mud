'use strict';

import io from 'socket.io-client';
import closeServer from '../lib/test-server.js';
import ioOptions from '../lib/io-options.js';
import newItem from '../../app/data/items.js';

describe('lookInContainer', () => {
  let player1;
  require('../lib/test-server.js');

  beforeEach(done => {
    player1 = io.connect('http://0.0.0.0:5000', ioOptions);
    player1.on('connect', () => {
      player1.emit('changeName', 'player1');
      player1.emit('teleport', 'Test - Nexus');
      player1.emit('updateSocket');
      player1.on('updateComplete', () => done());
    });
  });

  afterEach(done => {
    player1.disconnect();
    done();
  });

  afterAll(done => {
    closeServer();
    done();
  });

  describe('With a container that doesn\'t exist', () => {
    it('should return feedback saying so', done => {
      player1.emit('lookInContainer', {container: 'satchel'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('I don\'t see that container here.');
        done();
      });
    });
  });

  describe('With a target that isn\'t a container', () => {
    it('should return feedback saying so', done => {
      player1.emit('lookInContainer', {container: 'key'});
      player1.on('generalMessage', res => {
        expect(res.feedback).toEqual('That isn\'t a container.');
        done();
      });
    });
  });

  describe('With a valid target', () => {
    let player2;

    describe('As an observer of a living user', () => {
      beforeEach(done => {
        player2 = io.connect('http://0.0.0.0:5000', ioOptions);
        player2.on('connect', () => {
          player2.emit('teleport', 'Test - Nexus');
          player2.emit('updateSocket');
          player2.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player2.disconnect();
        done();
      });

      it('should say the user looks in an item', done => {
        player1.emit('lookInContainer', {container: 'corpse'});
        player2.on('generalMessage', res => {
          expect(res.from).toEqual('player1');
          expect(res.feedback).toEqual(' looks in a corpse.');
          done();
        });
      });
    });

    describe('As an observer of a ghost', () => {
      beforeEach(done => {
        player2 = io.connect('http://0.0.0.0:5000', ioOptions);
        player2.on('connect', () => {
          player2.emit('updateEffects', {death: true});
          player2.emit('changeName', 'player2');
          player2.emit('teleport', 'Test - Nexus');
          player2.emit('updateSocket');
          player2.on('updateComplete', () => done());
        });
      });

      afterEach(done => {
        player2.disconnect();
        done();
      });

      it('should say the ghost of so-and-so looks in a container', done => {
        player2.emit('lookInContainer', {container: 'corpse'});
        player1.on('generalMessage', res => {
          expect(res.from).toEqual('The ghost of player2');
          expect(res.feedback).toEqual(' looks in a corpse.');
          done();
        });
      });
    });

    describe('As the looker', () => {
      it('should return containedItems', done => {
        player1.emit('lookInContainer', {container: 'corpse'});
        player1.on('generalMessage', res => {
          expect(res.containedItems).toEqual([
            {
              ...newItem('potions', 'health potion'),
              id: res.containedItems[0].id
            },
            {
              ...newItem('potions', 'health potion'),
              id: res.containedItems[1].id
            }
          ]);
          done();
        });
      });
    });
  });

  describe('With dot notation', () => {
    describe('With the full term', () => {
      it('should return containedItems', done => {
        player1.emit('lookInContainer', {container: '2.backpack'});
        player1.on('generalMessage', res => {
          expect(res.containedItems).toEqual([
            {
              ...newItem('potions', 'health potion'),
              id: res.containedItems[0].id,
              drink: res.containedItems[0].drink
            },
            {
              ...newItem('potions', 'mana potion'),
              id: res.containedItems[1].id,
              drink: res.containedItems[1].drink
            }
          ]);
          done();
        });
      });
    });

    describe('With fuzzy matching', () => {
      it('should return containedItems', done => {
        player1.emit('lookInContainer', {container: '2.bac'});
        player1.on('generalMessage', res => {
          expect(res.containedItems).toEqual([
            {
              ...newItem('potions', 'health potion'),
              id: res.containedItems[0].id,
              drink: res.containedItems[0].drink
            },
            {
              ...newItem('potions', 'mana potion'),
              id: res.containedItems[1].id,
              drink: res.containedItems[1].drink
            }
          ]);
          done();
        });
      });
    });
  });
});
