'use strict';

import enemyDamageSkill from './enemy-damage-skill.js';
import enemyHealSkill from './enemy-heal-skills.js';

export default function enemyUseSkill(mobsInCombat, users, io) {
  for (let i = 0; i < mobsInCombat.length; i++) {
    const mobSkills = Object.values(mobsInCombat[i].skills);
    const skillsOffCooldown = mobSkills.filter(skill => skill.cooldownRemaining < 1);

    mobSkills.forEach(skill => {
      if (skill.cooldownRemaining > 0) skill.cooldownRemaining--;
    });

    if (skillsOffCooldown.length === 0) return;

    const chosenSkillName = skillsOffCooldown[Math.floor(Math.random() * skillsOffCooldown.length)].skillName;
    const selectedSkill = mobsInCombat[i].skills[chosenSkillName];

    if (selectedSkill.skillTypes.includes('damage')) {
      enemyDamageSkill(selectedSkill, mobsInCombat[i], users, io);
      continue;
    }

    enemyHealSkill(selectedSkill, mobsInCombat[i], mobsInCombat, io);
  }
}
