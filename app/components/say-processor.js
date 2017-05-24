'use strict';

export const sayProcessor = (result, socket) => {
  let post = {text: `"${result.text}"`};
  if (result.from === socket.username) post.from = 'You say, ';
  else post.from = `${result.from} says, `;

  return post;
};
