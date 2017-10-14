'use strict';

import mobRespawnProcessor from '../../app/processors/mob-respawn-processor.js';
import newMob from '../../app/data/mobs.js';

describe('Mob respawn processor with no mobs', () => {
  it('should respawn all missing mobs', () => {
    const originalRoom = [newMob('bat', 'Test - Nexus'), newMob('bat', 'Test - Nexus'), newMob('bat', 'Test - Nexus')];
    const currentRoom = [];

    expect(mobRespawnProcessor(originalRoom, currentRoom)).toEqual([
      {name: 'bat'},
      {name: 'bat'},
      {name: 'bat'}
    ]);
  });
});
