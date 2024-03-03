/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const entri = new Map(Object.entries(obj));
  const result = {};
  const ArrFruits = Object.keys(obj);
  for (const fruit of ArrFruits) {
    if (entri.has(fruit) && !fields.includes(fruit)) {
      result[fruit] = entri.get(fruit);
    }
  }
  return result;
};
