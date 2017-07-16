'use strict';

import skillHandler from '../../app/handlers/skill-handler.js';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {initialState as equipment} from '../../app/data/equipment-initial-state.js';
import {newMessage} from '../../app/actions/message-actions.js';
import newMob from '../../app/data/mobs.js';

describe('skillHandler', () => {
  let props = {
    skills: warriorSkills,
    effects: {death: false},
    globalCooldown: false,
    equipment,
    atk: 2,
    combat: {
      active: true,
      targets: [newMob('bat')]
    },
    username: 'Dave'
  };

  describe('If the user is not in combat', () => {
    it('should return feedback saying "You aren\'t in combat."', () => {
      expect(skillHandler(props.skills['slash'], 'bat', {...props, combat: {active: false, targets: []}})).toEqual({
        funcsToCall: [newMessage],
        feedback: 'You aren\'t in combat.'
      });
    });
  });
});
