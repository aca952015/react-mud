'use strict';

import sinon from 'sinon';
import saveCharacter from '../../lib/save-character.js';

describe('saveCharacter', () => {
  let homeCtx = {
    socket: {
      emit: sinon.spy()
    },
    props: {
      user: 'Dude',
      equipment: 'Equipment',
      effects: 'Effects'
    }
  };

  describe('From the home component', () => {
    it('should get the socket directly from homeCtx', () => {
      saveCharacter(homeCtx);
      expect(homeCtx.socket.emit.calledWith('saveCharacter', {
        ...homeCtx.props.user,
        equipment: homeCtx.props.equipment,
        effects: homeCtx.props.effects
      })).toEqual(true);
      expect(homeCtx.socket.emit.calledWith('escapeCombat')).toEqual(true);
      expect(homeCtx.socket.emit.calledWith('disconnect')).toEqual(true);
    });
  });

  describe('From the quit command', () => {
    it('should get the socket from the homeCtx props', () => {
      homeCtx = {
        props: {
          ...homeCtx.props,
          socket: {
            emit: sinon.spy()
          }
        }
      };
      saveCharacter(homeCtx);
      expect(homeCtx.props.socket.emit.calledWith('saveCharacter', {
        ...homeCtx.props.user,
        equipment: homeCtx.props.equipment,
        effects: homeCtx.props.effects
      })).toEqual(true);
      expect(homeCtx.props.socket.emit.calledWith('escapeCombat')).toEqual(true);
      expect(homeCtx.props.socket.emit.calledWith('disconnect')).toEqual(true);
    });
  });
});
