'use strict';

export default function termsProcessor(searchArray, split) {
  let foundStuff;
  let regEx = split.length > 1 ? new RegExp(`^${split[1]}`, 'i') : new RegExp(`^${split[0]}`, 'i');

  if (split.length > 1) {
    foundStuff = searchArray.filter(item => {
      if (item) {
        for (let i = 0; i < item.terms.length; i++) {
          if (item.terms[i].match(regEx)) return true;
        }
      }
    })[split[0] - 1];
  } else {
    foundStuff = searchArray.find(item => {
      if (item) {
        for (let i = 0; i < item.terms.length; i++) {
          if (item.terms[i].match(regEx)) return true;
        }
      }
    });
  }

  return foundStuff;
}
