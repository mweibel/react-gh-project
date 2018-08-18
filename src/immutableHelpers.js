/**
 * Updates an item at `index` in `list` by shallow merging (Object.assign-style)
 * the existing object with `obj`.
 *
 * @param {Array<Object>} list
 * @param {Number} index
 * @param {Object} obj
 * @returns {Array<Object>}
 */
export function immutableUpdateObjectInList(list, index, obj) {
  return [
    ...list.slice(0, index),
    { ...list[index], ...obj },
    ...list.slice(index + 1)
  ];
}
