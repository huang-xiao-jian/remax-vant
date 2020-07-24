/**
 * @description - generate sequential number
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

export function between(min: number, max: number): number[] {
  // 包含 max
  const length = max - min + 1;
  const collections = new Array(length);

  return collections.fill(0).map((_, index) => min + index);
}
