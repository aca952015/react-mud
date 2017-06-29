'use strict';

export default function duplicatesProcessor(itemArray, property) {
  let counts = {};
  // Create an object that has the counts for each item in the room.items array.
  // For example: If counts['key'] does not exist, counts['key'] is equal to 0 + 1,
  // indicating there is 1 key in the room. If counts['key'] does exist, then the value
  // of counts['key'] becomes the current value + 1.
  itemArray.forEach(item => counts[item.name] = (counts[item.name] || 0) + 1);

  // Create an array of item descriptions. If there is more than one item in the room,
  // referenced by checking our counts object, then prepend the string with parentheses
  // and the number of items. If not, just show the item description. Then remove
  // duplicate values using reduce.
  return itemArray.map(item => {
    let string = item[property];
    if (counts[item.name] > 1) string = `(${counts[item.name]}) ${string}`;
    return string;
  }).reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);
}
