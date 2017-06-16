'use strict';

import moveProcessor from '../../app/processors/move-processor.js';

describe('moveProcessor', () => {
  it('should return the appropriate movement object based on direction', () => {
    expect(moveProcessor({username: 'TestR', direction: 'up'})).toEqual({
      from: 'TestR',
      feedback: ' arrives from below.'
    });
  });
});
