'use strict';

export default function whisperProcessor(result, username) {
  let post = {};
  // If the message is to yourself, toYourself is true.
  // If the user is a third party to a user whispering to themselves, sameTarget is true.
  // If the speaker is a ghost, get the speaker's name
  let toYourself = result.target.toLowerCase() === username.toLowerCase();
  let ghostCheck = result.from.split('The ghost of ')[1];
  if (ghostCheck) ghostCheck = ghostCheck.toLowerCase();
  let sameTarget = result.from.toLowerCase() === result.target.toLowerCase();
  if (!sameTarget) sameTarget = ghostCheck === result.target.toLowerCase();

  if (result.from === username || ghostCheck === username.toLowerCase()) {
    post = {
      text: result.text,
      from: 'You ',
      target: toYourself ? null : result.target,
      commType: toYourself ? 'whisper to yourself, ' : 'whisper to ',
    };
  } else if (toYourself) {
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
