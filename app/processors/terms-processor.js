'use strict';

export default function termsProcessor(searchArray, split) {
  // This processor searches the terms array on objects to try and find the specified target.
  // Matches are made starting from the beginning of the string.
  // For example, if a leather helm has the terms ['leather', 'helm'] and the user enters
  // GET HEL, then this processor will match the 'helm' element and recognize that the user
  // is targeting the leather helm. If the user has 2 leather helms, GET 2.HE would be recognized
  // as the second leather helm.
  let foundStuff;
  let regEx = split.length > 1 ? new RegExp(`^${split[1]}`, 'i') : new RegExp(`^${split[0]}`, 'i');

  if (split.length > 1) {
    foundStuff = searchArray.filter(item => {
      for (let i = 0; i < item.terms.length; i++) {
        if (item.terms[i].match(regEx)) return true;
      }
    })[split[0] - 1];
  } else {
    foundStuff = searchArray.find(item => {
      for (let i = 0; i < item.terms.length; i++) {
        if (item.terms[i].match(regEx)) return true;
      }
    });
  }

  return foundStuff;
}
