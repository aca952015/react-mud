'use strict';

export default function moveProcessor(movement) {
  const directions = {
    'up': 'below.',
    'down': 'above.',
    'west': 'the east.',
    'east': 'the west.',
    'south': 'the north.',
    'north': 'the south.',
    'login': 'the nether.'
  };

  return {text: `${movement.username} arrives from ${directions[movement.direction]}`};
}
