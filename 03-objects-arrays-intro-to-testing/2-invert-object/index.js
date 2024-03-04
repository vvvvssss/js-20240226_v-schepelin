/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) return;
  const newObj = Object.entries(obj);
  for (let eachObj of newObj) {
    let empty;
    empty = eachObj[0];
    eachObj[0] = eachObj[1];
    eachObj[1] = empty;
  }
  return Object.fromEntries(newObj);
}
