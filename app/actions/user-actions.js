'use strict';

export function truncateDescription() {
  return {type: 'TRUNCATE_DESCRIPTION'};
}

export function addDescriptionParagraph(descObj) {
  return {
    type: 'ADD_DESCRIPTION_PARAGRAPH',
    payload: descObj.playerDescription[descObj.playerDescription.length - 1]
  };
}

export function clearDescription() {
  return {type: 'CLEAR_DESCRIPTION'};
}

export function loginUser(char) {
  return {
    type: 'LOGIN_USER',
    payload: char
  };
}

export function loginEquipment(equipment) {
  return {
    type: 'LOGIN_EQUIPMENT',
    payload: equipment
  };
}

export function tickRegen() {
  return {type: 'TICK_REGEN'};
}
