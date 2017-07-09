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
