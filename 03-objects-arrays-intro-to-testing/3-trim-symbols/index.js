/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length == 0 || size <= 0) return "";
  if (!size) return string;
  for (let i = 0; i < string.length; i++) {
    let countY = 1;
    for (let y = i + 1; y < string.length; y++) {
      if (string[i] == string[y] && countY < size) {
        countY++;
        continue;
      }
      if (string[i] == string[y] && countY == size) {
        string = string.slice(0, y) + string.slice(y + 1);
        y -= 1;
        continue;
      }
      if (string[i] != string[y]) {
        break;
      }
    }
  }
  return string;
}
