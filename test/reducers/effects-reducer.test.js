'use strict';

import reducer from '../../app/reducers/effects-reducer.js';

describe('Effects reducer', () => {
  describe('It should return an empty object by default', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  describe('With an action of ADD_EFFECT', () => {
    it('should set that state to a boolean of true as a property on the state object', () => {
      expect(reducer({}, {type: 'ADD_EFFECT', payload: {effectName: 'death', effects: true}})).toEqual({death: true});
    });

    it('should create an expirationMessage property if there is one', () => {
      expect(reducer({}, {type: 'ADD_EFFECT', payload: {effectName: 'infusion', effects: {atk: 3, mat: 3, duration: 1}, expirationMessage: 'derp'}})).toEqual({
        infusion: {
          atk: 3,
          mat: 3,
          duration: 1,
          expirationMessage: 'derp'
        }
      });
    });

    it('should create an expireFunction property if there is one', () => {
      expect(reducer({}, {type: 'ADD_EFFECT', payload: {effectName: 'infusion', effects: {atk: 3, mat: 3, duration: 1}, expireFunction: 'some function'}})).toEqual({
        infusion: {
          atk: 3,
          mat: 3,
          duration: 1,
          expireFunction: 'some function'
        }
      });
    });
  });

  describe('With an action of REMOVE_EFFECT', () => {
    it('should delete the payload\'s property from the state', () => {
      expect(reducer({death: true, test: true}, {type: 'REMOVE_EFFECT', payload: 'test'})).toEqual({death: true});
    });
  });

  describe('With an action of LOGIN_EFFECTS', () => {
    it('should set the state to the payload', () => {
      expect(reducer({}, {type: 'LOGIN_EFFECTS', payload: 'Ayy'})).toEqual('Ayy');
    });
  });

  describe('With an action of DECREMENT_EFFECT_DURATIONS', () => {
    it('should not try to change durations if there isn\'t one', () => {
      expect(reducer({death: true}, {type: 'DECREMENT_EFFECT_DURATIONS'})).toEqual({death: true});
    });

    it('should reduce the duration of effects by 1', () => {
      expect(reducer({infusion: {duration: 2}}, {type: 'DECREMENT_EFFECT_DURATIONS'})).toEqual({infusion: {duration: 1}});
    });

    it('should remove effects if it\'s the last tick', () => {
      expect(reducer({infusion: {duration: 1}}, {type: 'DECREMENT_EFFECT_DURATIONS'})).toEqual({});
    });
  });

  describe('With an action of REFRESH_DURATION', () => {
    it('should reset the duration of the current effect', () => {
      expect(reducer({infusion: {duration: 1, expireFunction: 'someFunc'}}, {type: 'REFRESH_DURATION', payload: {effectName: 'infusion', duration: 2}})).toEqual({
        infusion: {
          duration: 2,
          expireFunction: 'someFunc'
        }
      });
    });
  });
});
