'use strict';

export default function duplicatesProcessor(itemArray, property) {
  // Create an object that has the counts for each item in the itemArray array.
  // For example: If counts['key'] does not exist, counts['key'] is equal to 0 + 1,
  // indicating there is 1 key to be displayed. If counts['key'] does exist, then the value
  // of counts['key'] becomes the current value + 1.
  const counts = itemArray.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  // Create an array of strings according to the property parameter and counts. If there is
  // more than one of an item, referenced by checking the counts object, then prepend the string
  // with parentheses and the number of items. If not, just show the property. Then
  // remove duplicates values using reduce.
  // As an example, [{health potion}, {mana potion}, {health potion}] would display as:
  // (2) a red potion
  // a blue potion
  return itemArray.map(item => counts[item.name] > 1 ? `(${counts[item.name]}) ${item[property]}` : item[property])
  .reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);
}
