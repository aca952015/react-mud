'use strict';

export default function sayProcessor(result, socket) {
  let post = {text: result.from ? `${result.text}` : result.text};
  if (!result.from) return post;
  if (result.from === socket.username) {
    post.from = 'You ';
    post.commType = 'say, ';
  }
  else {
    post.from = result.from;
    post.commType = ' says, ';
  }

  return post;
}
