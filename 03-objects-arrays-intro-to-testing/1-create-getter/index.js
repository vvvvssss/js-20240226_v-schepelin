/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split(".");
  return function (obj) {
    let field = obj;
    for (const key of keys) {
      if (!field || Object.hasOwnProperty(field, key)) {
        return;
      }
      field = field[key];
    }
    return field;
  };
}
