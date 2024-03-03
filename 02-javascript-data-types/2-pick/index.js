/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const entri = new Map(Object.entries(obj));
  const result = {};
  for (const fruit of fields) {
    if (entri.has(fruit)) {
      result[`${fruit}`] = `${entri.get(fruit)}`;
    }
  }
  return result;
};
