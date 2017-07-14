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

  return {
    from: movement.username,
    feedback: ` arrives from ${directions[movement.direction]}`};
}
