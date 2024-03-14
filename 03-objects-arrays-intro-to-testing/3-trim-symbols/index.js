/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length == 0 || size <= 0) return "";
  if (!size) return string;
  let countRepeat = 1;
  for (let i = 0; i < string.length; i++) {
    if (string[i] != string[i + 1]) {
      countRepeat = 1;
      continue;
    }
    if (string[i] == string[i + 1] && countRepeat < size) {
      countRepeat++;
      continue;
    }
    if (string[i] == string[i + 1] && countRepeat == size) {
      countRepeat++;
    }
    if (string[i] == string[i + 1] && countRepeat > size) {
      string = string.slice(0, i + 1) + string.slice(i + 2);
      i -= 1;
    }
  }
  return string;
}
