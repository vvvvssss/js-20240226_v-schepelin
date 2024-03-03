/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const numb = param === "desc" ? -1 : 1;
  return [...arr].sort(
    (a, b) => numb * a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" })
  );
}
