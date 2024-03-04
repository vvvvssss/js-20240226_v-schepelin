/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const key = path.split(".");
  return function (obj) {
    let field = obj[key[0]];
    for (let i = 1; i < key.length; i++) {
      if (!field || Object.hasOwnProperty(field, key[i])) {
        return;
      }
      field = field[key[i]];
    }
    return field;
  };
}
