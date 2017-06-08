'use strict';

export function restoreHealth(character, amount) {
  character.hp += amount;
  if (character.hp > character.maxHP) character.hp = character.maxHP;
}

export function restoreMana(character, amount) {
  character.mp += amount;
  if (character.mp > character.maxMP) character.mp = character.maxMP;
}
