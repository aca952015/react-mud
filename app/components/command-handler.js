'use strict';

export const commandHandler = (command, args, props) => {
  if (command === 'say') {
    return {
      from: `${props.username} says, `,
      text: `"${args}"`
    };
  }
};
