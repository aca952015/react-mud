'use strict';

import damageSkillProcessor from '../processors/damage-skill-processor.js';
import healingSkillProcessor from '../processors/healing-skill-processor.js';

export default function skillHandler(skill, args, props) {
  if (skill.skillTypes.includes('damage')) return damageSkillProcessor(skill, args, props);
  return healingSkillProcessor(skill, args, props);
}
