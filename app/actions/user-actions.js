'use strict';

export function addDescriptionParagraph(descObj) {
  return {
    type: 'ADD_DESCRIPTION_PARAGRAPH',
    payload: descObj.playerDescription[descObj.playerDescription.length - 1]
  };
}

export function changeStat(item) {
  return {
    type: 'CHANGE_STAT',
    payload: {
      statToChange: item.statToChange,
      amount: item.amount
    }
  };
}

export function clearDescription() {
  return {type: 'CLEAR_DESCRIPTION'};
}

export function tickRegen() {
  return {type: 'TICK_REGEN'};
}

export function truncateDescription() {
  return {type: 'TRUNCATE_DESCRIPTION'};
}
