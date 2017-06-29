'use strict';

export default function duplicatesProcessor(itemArray) {
  let counts = {};
  itemArray.forEach(item => counts[item.name] = (counts[item.name] || 0) + 1);

  return itemArray.map(item => {
    let string = item.short;
    if (counts[item.name] > 1) string = `(${counts[item.name]}) ${string}`;
    return string;
  }).reduce((acc, ele) => {
    if (!acc.includes(ele)) acc.push(ele);
    return acc;
  }, []);
}
