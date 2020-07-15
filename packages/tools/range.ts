// eslint-disable-next-line import/prefer-default-export
export function range(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
