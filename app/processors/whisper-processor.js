'use strict';

export default function whisperProcessor(result, socket) {
  let post = {};
  if (result.from === socket.username) {
    post = {
      text: `"${result.text}"`,
      from: 'You ',
      target: result.target,
      commType: result.target.toLowerCase() === socket.username.toLowerCase() ? 'whisper to yourself, ' : 'whisper to ',

    };
  } else if (result.target.toLowerCase() === socket.username.toLowerCase()){
    post = {
      text: `"${result.text}"`,
      from: result.from,
      target: 'you',
      commType: ' whispers to '
    };
  } else {
    post = {
      from: result.from,
      target: result.target,
      commType: result.from.toLowerCase() === result.target.toLowerCase() ?
      ' whispers something quietly.' :
      ' whispers something to ',
      text: ' '
    };
  }

  return post;
}
