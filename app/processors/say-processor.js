'use strict';

export default function sayProcessor(result, socket) {
  let post = {text: result.from ? `"${result.text}"` : result.text};
  if (!result.from) return post;
  if (result.from === socket.username) post.from = 'You say, ';
  else post.from = `${result.from} says, `;

  return {
    text: 'derp'
  };
}
