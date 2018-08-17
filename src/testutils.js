/**
 * Because of setImmediate(), this function
 * returns only when the next event tick has been completed,
 * therefore some of the promises currently running should
 * have been resolved/rejected at this time.
 *
 * Used to ensure e.g. that a component has been fully mounted.
 * There are other approaches to this problem, but none
 * of those I found feel better.
 *
 * @returns {Promise<any>}
 */
export function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}