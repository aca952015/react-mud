'use strict';

export default function whisperProcessor(result, username) {
  let post = {};
  let toYourself = result.target.toLowerCase() === username.toLowerCase();
  let sameTarget = result.from.toLowerCase() === result.target.toLowerCase();

  if (result.from === username) {
    post = {
      text: result.text,
      from: 'You ',
      target: toYourself ? null : result.target,
      commType: toYourself ? 'whisper to yourself, ' : 'whisper to ',
    };
  } else if (toYourself){
    post = {
      text: result.text,
      from: result.from,
      target: 'you',
      commType: ' whispers to '
    };
  } else {
    post = {
      from: result.from,
      target: sameTarget ? null : result.target,
      commType: sameTarget ?
      ' whispers something quietly.' :
      ' whispers something to '
    };
  }

  return post;
}
