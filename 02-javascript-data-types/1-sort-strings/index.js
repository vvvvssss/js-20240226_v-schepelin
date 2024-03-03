/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  let numb = 1;
  if (param === "desc") {
    numb = -1;
  } else {
    numb = 1;
  }
  return [...arr].sort(
    (a, b) => numb * a.localeCompare(b, "ru", { caseFirst: "upper" })
  );
}
