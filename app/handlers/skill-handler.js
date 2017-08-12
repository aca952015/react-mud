'use strict';

import damageSkillProcessor from '../processors/damage-skill-processor.js';
import healingSkillProcessor from '../processors/healing-skill-processor.js';
import effectSkillProcessor from '../processors/effect-skill-processor.js';
import debuffSkillProcessor from '../processors/debuff-skill-processor.js';

export default function skillHandler(skill, args, props) {
  if (skill.skillTypes.includes('damage')) return damageSkillProcessor(skill, args, props);
  if (skill.skillTypes.includes('buff')) return effectSkillProcessor(skill, args, props);
  if (skill.skillTypes.includes('debuff')) return debuffSkillProcessor(skill, args, props);
  return healingSkillProcessor(skill, args, props);
}
