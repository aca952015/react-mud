'use strict';

import reducer from '../../app/reducers/skill-reducer.js';

describe('skills reducer', () => {
  it('should have an initialState of an empty object', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  describe('With an action of "ON_COOLDOWN"', () => {
    it('should set the passed in skill onCooldown to true', () => {
      expect(reducer({slash: {onCooldown: false}}, {type: 'ON_COOLDOWN', payload: 'slash'})).toEqual({
        slash: {onCooldown: true}
      });
    });
  });
});
