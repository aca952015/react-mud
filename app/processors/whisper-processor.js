'use strict';

export default function whisperProcessor(result, socket) {
  let post = {};
  if (result.from === socket.username) {
    post = {
      text: `"${result.text}"`,
      from: result.target.toLowerCase() === socket.username.toLowerCase() ? 'You whisper to yourself, ' : `You whisper to ${result.target}, `
    };
  } else if (result.target.toLowerCase() === socket.username.toLowerCase()){
    post = {
      text: `"${result.text}"`,
      from: `${result.from} whispers to you, `
    };
  } else {
    post = {
      text: result.from.toLowerCase() === result.target.toLowerCase() ?
      `${result.from} whispers something quietly.` :
      `${result.from} whispers something to ${result.target}.`
    };
  }

  return post;
}
