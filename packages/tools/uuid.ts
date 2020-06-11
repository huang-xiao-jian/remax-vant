/**
 * @description generate random identity
 * @see https://gist.github.com/gordonbrander/2230317
 */

function uuid(): string {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export default uuid;
